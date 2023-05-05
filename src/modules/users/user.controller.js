import { blogModel } from "../../../models/blog.model.js";
import { userModel } from "../../../models/user.model.js";
import { ApiError } from "../../../utilities/ApiError.js";
import { catchAsyncError } from "../../../utilities/catchError.js";

//add user
//access admin
export const addUser = catchAsyncError(async (req, res, next) => {
  if (req.user.role == "admin") {
    const { name, email, password, pic } = req.body;
    let existUser = await userModel.findOne({ email });
    if (existUser) return next(new ApiError("user already exist", 409));

    let newUser = new userModel({
      name,
      email,
      password,
    });
    await newUser.save();
    res.json({ msg: "success" });
  } else return next(new ApiError("not allwoed for u", 400));
});


//get lall users
//access admin
export const users = catchAsyncError(async (req, res, next) => {
  if (req.user.role == "admin") {
    let users = await userModel.find({});
    res.json({ message: users });
  }
  ///**** user */
  else {
    next(new ApiError("not for u", 404));
  }
});

//upload photo
export const uploadPhoto = catchAsyncError(async (req, res, next) => {
  let user = await userModel.findByIdAndUpdate(req.user.id, {
    pic: req.file.filename,
  });
  if (user) {
    console.log(user);
    res.json({ message: "success" });
  }
});


//delete user
//access admin or user nafso
export const deleteUserProfile = catchAsyncError(async (req, res, next) => {
  const {id} = req.params
  const user = await userModel.findByIdAndDelete(id);
  if (user) {
    if(id == req.user.id || req.user.role=='admin')
   { await blogModel.deleteMany({ createdBy: req.user.id });
    await commentModel.deleteMany({ userId: req.user.id });
    res.json({ message: "succes" });}
    else
    next(new ApiError("not your business", 404));
  } else next(new ApiError("user not exist", 404));
});

//find user profile
//access public
export const userProfile = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let user = await userModel.findById(id).select('-password').populate('blogs')
  if(user)
  res.json({ message: user });

  else next(new ApiError("user not exist", 404));
});

//edit name or email
//access user nafso
export const editUserProfile = catchAsyncError(async (req, res, next) => {
  const {id} = req.params
  const { name, email } = req.body;
  let user = await userModel.findById(id);
  if (user) {
    if(id == req.user.id)
   { let newUser = await userModel.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    );
    res.json({ message: "success", newUser });
  }
    else
    res.json({ message: "not your business" });
  }

  return next(new ApiError("user not here", 404));
});

