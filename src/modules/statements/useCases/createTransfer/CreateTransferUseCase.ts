import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { ICreateTransferDTO } from "./ICreateTransferDTO";
import { AppError } from "../../../../shared/errors/AppError";
enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  TRANSFER = "transfer",
}

@injectable()
export class CreateTransferUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("StatementsRepository")
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({
    user_id,
    receiver_id,
    amount,
    description,
  }: ICreateTransferDTO) {
    const sender = await this.usersRepository.findById(user_id);
    const receiver = await this.usersRepository.findById(receiver_id!);

    if (!sender) {
      throw new AppError("Sender not found");
    }

    if (!receiver) {
      throw new AppError("Receiver not found");
    }

    const { balance } = await this.statementsRepository.getUserBalance({
      user_id: user_id,
    });

    if (balance < amount) {
      throw new AppError("Insufficient funds");
    }

    return this.statementsRepository.create({
      user_id: user_id,
      receiver_id: receiver_id!,
      type: OperationType.TRANSFER,
      amount,
      description,
    });
  }
}
