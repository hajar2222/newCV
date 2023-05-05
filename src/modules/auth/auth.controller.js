import { userModel } from "../../../models/user.model.js";
import { ApiError } from "../../../utilities/ApiError.js";
import { catchAsyncError } from "../../../utilities/catchError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password,role } = req.body;
  let existUser = await userModel.findOne({ email });
  if (existUser) return next(new ApiError("user already exist", 409));

  let newUser = new userModel({
    name,
    email,
    password,
    role
  });
  await newUser.save();
  res.json({ msg: "success" });
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const existUser = await userModel.findOne({ email });
  const match = bcrypt.compareSync(password, existUser.password);
  if (existUser && match) {
    let token = jwt.sign({ id: existUser._id, name: existUser.name ,role:existUser.role},"test");
    return res.json({ message: "success", token });
  }
 
  return next(new ApiError("incorrect email or password", 404));
});
