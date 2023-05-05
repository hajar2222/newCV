import multer from "multer";
import { ApiError } from "./ApiError.js";

export function upload() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else {
      cb(null, false);
      cb(new ApiError("I don't have a clue!", 404));
    }
  }
  const upload = multer({ storage: storage, fileFilter });
  return upload.single('pic')
}
