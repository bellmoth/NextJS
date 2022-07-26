import connectDB from "../../connectDB";
import User from "../../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  // console.log(req.method)
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(422).json({ error: "please ass all the fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User don't  exists with that email" });
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (doMatch) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const { email, _id } = user;

      return res
        .status(201)
        .json({ token, user: { email, _id }, message: "login success" });
    } else {
      return res.status(401).json({ message: "incorrect credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};
