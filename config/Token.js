import jwt from "jsonwebtoken";

const Token = (id) => {
  return jwt.sign(
    { id }, // payload MUST be an object
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default Token;
