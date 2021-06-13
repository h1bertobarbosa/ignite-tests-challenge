export default {
  jwt: {
    secret: process.env.JWT_SECRET || "senhasupersecreta123",
    expiresIn: "1d",
  },
};
