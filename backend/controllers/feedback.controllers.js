import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Feedback Controller
export const sendFeedback = async (req, res) => {
  const { email, feedback, name } = req.body;

  if (!email || !feedback || !name) {
    return res.status(400).json({
      success: false,
      message: "Email, feedback, and name are required.",
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,
    replyTo: email,
    subject: "New Feedback Received",
    text: `Feedback from: ${name}\n\n${feedback}\n\nReply to: ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: "Feedback sent successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send feedback email.",
      error: error.message,
    });
  }
};
