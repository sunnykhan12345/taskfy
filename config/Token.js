import jwt from "jsonwebtoken";

const Token = (payload) => {
  return jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: "7d" });
};

export default Token;
