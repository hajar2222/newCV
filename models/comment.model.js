import mongoose  from "mongoose";


const commentSchema= mongoose.Schema({
    comment:String,
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    blogId:{
        type:mongoose.Types.ObjectId,
        ref:'blog'
    },
},{
    timestamps: true,
})

export const commentModel = mongoose.model('comment',commentSchema)