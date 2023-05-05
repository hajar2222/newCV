import { blogModel } from "../../../models/blog.model.js";
import { commentModel } from "../../../models/comment.model.js";
import { userModel } from "../../../models/user.model.js";
import { ApiError } from "../../../utilities/ApiError.js";
import { catchAsyncError } from "../../../utilities/catchError.js";

// ///////// user
//access login 
export const addBlog = async (req, res, next) => {
  const { desc, title } = req.body;
  const existUser = await userModel.findById(req.user.id);
  if (existUser) {
    let blog = await blogModel.insertMany({
      desc,
      title,
      createdBy: existUser._id,
    });
    res.json({ message: blog });
  }
  return next(new ApiError("user not here", 404));
};
//access public
export const getBlogs = async (req, res, next) => {
  const POST_PER_PAGE = 3;
  const { pageNum } = req.query;
  const allBlogs= await blogModel.find({})
  const blogs = await blogModel
    .find({})
    .skip((pageNum - 1) * POST_PER_PAGE)
    .limit(POST_PER_PAGE)
    .populate("createdBy").populate('comments')
    .sort({ createdBy: -1 });
  res.json({ message: "success", blogs ,results:Math.ceil(allBlogs.length/POST_PER_PAGE)});
};

//access public
export const getSingleBlog = async (req, res, next) => {
  const blog = await blogModel
    .findById(req.params.id)
    .populate("createdBy")
     .populate('comments')
    .sort({ createdBy: -1 });
  if (blog) res.json({ message: "success", blog });
  return next(new ApiError("post deleted"));
};

//access blogowner or admin
export const deleteBlog = async (req, res, next) => {
    const {id} = req.params
    let blog= await blogModel.findById(id)
    if (!blog) return next(new ApiError('blog not here',400))
     await userModel.findById(req.user.id);
  if(req.user.id == blog.createdBy || req.user.role=='admin')
  {
    await commentModel.deleteMany({ blogId: id });
    await blogModel.findByIdAndDelete(id)
    res.json({message:'success'})
  }
  else
  return next(new ApiError('not your business',400))
};

//access blogowner 
export const updateBlog = async (req, res, next) => {
  const { desc,title } = req.body;
  const {id} = req.params
  let blog= await blogModel.findById(id)
    if (!blog) return next(new ApiError('blog not here',400))
    let existUser = await userModel.findById(req.user.id);
  if(req.user.id == blog.createdBy)
  {
    let newblog = await blogModel.findByIdAndUpdate(id,{title,desc},{new:true})
    res.json({message:'success',newblog})
  }
  else
  return next(new ApiError('not your business',400))
};


//toggle like
//access login
export const toggleLike = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params

    let existBlog =  await blogModel.findById(id);
   
    if(!existBlog)
    return next(new ApiError('blog not exist',404))
    const alreadyLike = existBlog.likes.find((user)=>user.toString() == req.user.id)
    if(alreadyLike)
    {
     existBlog = await blogModel.findByIdAndUpdate(id,{
        $pull:{likes:req.user.id}
     },{new:true});
     
    }
    else{
        existBlog = await blogModel.findByIdAndUpdate(id,{
            $push:{likes:req.user.id}
         },{new:true});
    }
    res.json({message:'success'})
}
    )

