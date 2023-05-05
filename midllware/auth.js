import jwt from "jsonwebtoken";
export const auth = () => {
  return (req, res, next) => {
    const { token } = req.headers;
    if (token) {
      jwt.verify(token, "test", function (err, decoded) {
        if (err) res.json({ err });
        else {
          req.user = decoded;
          next();
        }
      });
    } else res.json({ message: "token not provided" });
  };
};
