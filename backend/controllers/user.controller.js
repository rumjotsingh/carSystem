import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

// Helper: Generate JWT
const generateToken = (userId) =>
  JWT.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "10h" });

/* =============== REGISTER =============== */
export const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed", error: err.message });
  }
};

/* =============== LOGIN =============== */
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email & Password required." });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Invalid credentials." });

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed", error: err.message });
  }
};

/* =============== GOOGLE LOGIN =============== */
export const googleLoginController = async (req, res) => {
  const { googleId, email, name } = req.body;
  if (!googleId || !email || !name)
    return res.status(400).json({ success: false, message: "Incomplete Google user data." });

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ googleId, email, name });
      await user.save();
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Google login failed", error: err.message });
  }
};
