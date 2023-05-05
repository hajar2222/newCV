import { commentModel } from "../../../models/comment.model.js";
import { catchAsyncError } from "./../../../utilities/catchError.js";
import { blogModel } from "./../../../models/blog.model.js";
import { ApiError } from "./../../../utilities/ApiError.js";

//create comment
//access login user

export const addComment = catchAsyncError(async (req, res, next) => {
  const { comment, blogId } = req.body;
  const existBlog = await blogModel.findById(blogId);
  if (!existBlog) return next(new ApiError("blog not here"));
  const newComment = new commentModel({ comment, blogId, userId: req.user.id });
  const myComment = await newComment.save();
  res.json({ message: "success", myComment });
});
//admin
export const getAllComment = catchAsyncError(async (req, res, next) => {
  if (req.user.role == "admin") {
    const comments = await commentModel
      .find({})
      .populate("userId")
      .populate("blogId");
    res.json({ message: "success", comments });
  } else return next(new ApiError("not ur business"));
});
//comment owner or admin
export const deleteComment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const comment = await commentModel.findById(id);
  if (comment) {
    if (comment.userId.toString() == req.user.id || req.user.role == "admin") {
      const comments = await commentModel.findByIdAndDelete(id);
      res.json({ message: "success", comments });
    }
    else return next(new ApiError("not ur business"));
  } 
  else return next(new ApiError("comment has been deleted"));
});
//comment owner
export const updateComment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const comment = await commentModel.findById(id);
  if (comment) {
    if (comment.userId.toString() == req.user.id) {
      const comments = await commentModel.findByIdAndUpdate(id,{comment:req.body.comment},{new:true});
      res.json({ message: "success", comments });
    }
    else return next(new ApiError("not ur business"));
  } 
  else return next(new ApiError("comment has been deleted"));
});
