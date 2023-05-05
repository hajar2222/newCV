import express from 'express';
import { dbConnection } from './db/db.js';
import { authRouter } from './src/modules/auth/auth.routes.js';
import { userRouter } from './src/modules/users/user.routes.js';
import { blogRouter } from './src/modules/blog/blog.routes.js';
import { commentRouter } from './src/modules/comments/comment.routes.js';
import cors from 'cors'

const app = express()
dbConnection()
app.use(cors())
app.use(express.json())
app.use(express.static('uploads/'))
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/blog',blogRouter)
app.use('/api/v1/comment',commentRouter)



app.use((err,req,res,next)=>{res.json({error:{
    message:err.message,
    code:err.code||500,
}})})
app.listen(5000,()=>{console.log('run')})

