import { auth } from "../../../midllware/auth.js";
import { validaition } from "../../../midllware/validation.js";
import { addUser, deleteUserProfile, editUserProfile, uploadPhoto, userProfile, users } from "./user.controller.js";
import  express  from 'express';
import { addUserSchema } from "./user.joi.js";
import { upload } from "../../../utilities/fileupload.js";

export const userRouter = express.Router();

userRouter.post("/",upload(),validaition(addUserSchema),auth(), addUser);
userRouter.get("/",auth(), users);
userRouter.delete("/:id",auth(), deleteUserProfile);
userRouter.get("/:id", userProfile);
userRouter.put("/:id",auth(), editUserProfile);
userRouter.patch('/photo',upload(),auth(),uploadPhoto)