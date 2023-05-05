import Joi  from 'joi';
export const addCommentSchema = Joi.object({
    blogId: Joi.string().required(),
    comment: Joi.string().required(),
  });
export const updateCommentSchema = Joi.object({
    comment: Joi.string().required(),
  });
