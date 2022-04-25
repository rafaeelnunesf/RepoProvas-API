import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as authRepository from "../repositories/authRepository.js";
export async function verifyIfUserExists(
  email: string,
  path: "sign-up" | "sign-in"
) {
  const user = await authRepository.findbyEmail(email);
  if (path === "sign-in" && !user) {
    throw {
      type: "bad_request",
      message: "This email is not registered!",
    };
  }
  if (path === "sign-up" && user)
    throw {
      type: "bad_request",
      message: "This email is already registered!",
    };
  return user;
}

export async function verifyPassword({ password, passwordHashed }) {
  const passwordsMatch = bcrypt.compareSync(password, passwordHashed);
  if (!passwordsMatch)
    throw {
      type: "unauthorized",
      message: "Invalid password!",
    };
}

export async function insert({ email, password }) {
  const passwordHashed = bcrypt.hashSync(password, 10);
  authRepository.insert({ email, password: passwordHashed });
}

export async function generateToken({ user }) {
  const secretKey = process.env.SECRET_KEY;
  delete user.password;
  const token = jwt.sign(user, secretKey);
  return token;
}
