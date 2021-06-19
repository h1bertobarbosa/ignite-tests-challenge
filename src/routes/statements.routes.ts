import { Router } from "express";

import { CreateStatementController } from "../modules/statements/useCases/createStatement/CreateStatementController";
import { CreateTransferController } from "../modules/statements/useCases/createTransfer/CreateTransferController";
import { GetBalanceController } from "../modules/statements/useCases/getBalance/GetBalanceController";
import { GetStatementOperationController } from "../modules/statements/useCases/getStatementOperation/GetStatementOperationController";
import { ensureAuthenticated } from "../shared/infra/http/middlwares/ensureAuthenticated";

const statementRouter = Router();
statementRouter.use(ensureAuthenticated);

statementRouter.get("/balance", new GetBalanceController().execute);
statementRouter.post("/deposit", new CreateStatementController().execute);
statementRouter.post("/withdraw", new CreateStatementController().execute);
statementRouter.get(
  "/:statement_id",
  new GetStatementOperationController().execute
);
statementRouter.post(
  "/transfers/:receiver_id",
  new CreateTransferController().execute
);

export { statementRouter };
