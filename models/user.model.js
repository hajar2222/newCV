import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1682770121~exp=1682770721~hmac=f4405704d4531163fe6e97e858ba08983f175bd78ef4ef9e80f32a71bb2937fc",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject:{ virtuals: true },
    toJSON:{ virtuals: true },
  }
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 7);
});

userSchema.pre('findOneAndUpdate',function(){
  
    this._update.pic = "http://localhost:3000/" + this._update.pic;
})


userSchema.virtual('blogs', {
    ref: 'blog',
    localField: '_id',
    foreignField: 'createdBy',
  })

export const userModel = mongoose.model("user", userSchema);
