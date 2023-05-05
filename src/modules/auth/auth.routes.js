import express from "express";
import { login, register } from "./auth.controller.js";
import { validaition } from "../../../midllware/validation.js";
import { addUserSchema, loginSchema } from "../users/user.joi.js";
import { upload } from "../../../utilities/fileupload.js";
export const authRouter = express.Router();

authRouter.post("/register",upload(),validaition(addUserSchema), register);
authRouter.post("/login", validaition(loginSchema),login);
