import  express  from 'express';
import { addBlog  
    , deleteBlog, getBlogs, getSingleBlog, toggleLike, updateBlog } from "./blog.controller.js";
import { auth } from '../../../midllware/auth.js';
import { validaition } from '../../../midllware/validation.js';
import { addBlogSchema, deleteBlogSchema, updateBlogSchema } from './blog.joi.js';

export const blogRouter = express.Router();

blogRouter.post("/",validaition(addBlogSchema),auth(), addBlog);
blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getSingleBlog);
blogRouter.put("/likes/:id", auth(),toggleLike);
blogRouter.delete("/:id",validaition(deleteBlogSchema),auth(), deleteBlog);
blogRouter.put("/:id",validaition(updateBlogSchema),auth(), updateBlog);