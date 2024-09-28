import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return token;
};

export const Register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.cookie("token", token);
    return res.status(201).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
      message: "User registered successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = generateToken(user._id);
    res.cookie("token", token);

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
