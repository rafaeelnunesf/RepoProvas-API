import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import authSchema from "../schemas/signUpSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchemaMiddleware(authSchema), signUp);
authRouter.post("/sign-in", validateSchemaMiddleware(authSchema), signIn);

export default authRouter;
