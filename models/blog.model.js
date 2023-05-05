import mongoose from "mongoose";

 const blogSchema = mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    likes:[{ type:mongoose.Types.ObjectId,ref:'user'}]
    
}, {
    timestamps: true,
    
    toObject:{ virtuals: true },
    toJSON:{ virtuals: true },
  })


blogSchema.virtual('comments',{
   ref:'comment',
   localField: '_id',
   foreignField: 'blogId',
})

export const blogModel = mongoose.model('blog',blogSchema)