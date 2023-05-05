import  express  from 'express';
import { addComment, deleteComment, getAllComment, updateComment } from './comment.contrroler.js';
import { validaition } from '../../../midllware/validation.js';
import { addCommentSchema, updateCommentSchema } from './comment.joi.js';
import { auth } from '../../../midllware/auth.js';

export const commentRouter = express.Router()

commentRouter.post('/',validaition(addCommentSchema),auth(),addComment)
commentRouter.get('/',auth(),getAllComment)
commentRouter.delete('/:id',auth(),deleteComment)
commentRouter.put('/:id',validaition(updateCommentSchema),auth(),updateComment)