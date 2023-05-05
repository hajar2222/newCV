import Joi from "joi";

export const addBlogSchema = Joi.object({
  desc: Joi.string().required(),
  title: Joi.string().required(),
});
export const deleteBlogSchema = Joi.object({
  desc: Joi.string(),
  title: Joi.string(),
});
export const updateBlogSchema = Joi.object({
  desc: Joi.string(),
  title: Joi.string(),
  
});
