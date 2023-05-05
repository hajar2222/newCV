import mongoose from "mongoose";

export const dbConnection= ()=>{ mongoose
  .connect("mongodb://127.0.0.1:27017/newblogApp")
  .then(() => {
    console.log("connnected");
  })
  .catch((err) => {
    console.log(err);
  })
}
