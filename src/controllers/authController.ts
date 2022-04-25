import { Request, Response } from "express";
import * as authServices from "../services/authServices.js";

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  await authServices.verifyIfUserExists(email, "sign-up");
  await authServices.insert({ email, password });
  res.sendStatus(201);
}
export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await authServices.verifyIfUserExists(email, "sign-in");
  const passwordHashed = user.password;
  await authServices.verifyPassword({ password, passwordHashed });
  const token = await authServices.generateToken({ user });

  res.status(200).send(token);
}
