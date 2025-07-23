import bcrypt from "bcrypt";
import User from "../models/authModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateVerificationToken,
} from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userExists = await User.findOne({
      $or: [
        {
          email: email.toLowerCase(),
        },
        {
          phoneNumber,
        },
      ],
    });

    if (userExists) {
      if (userExists.email === email.toLowerCase()) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      if (userExists.phoneNumber === phoneNumber) {
        return res
          .status(400)
          .json({ success: false, message: "Phone number already exists" });
      }
    }

    const verificationToken = generateVerificationToken();
    const verificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ); // 24 hours

    const user = new User({
      name,
      email: email.toLowerCase(),
      phoneNumber,
      password,
      verificationToken,
      verificationTokenExpiresAt,
    });

    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    return res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please check your email for verification.",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          isVerified: user.isVerified,
        },
        accessToken,
        refreshToken,
      },
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during registration",
    });
  }
};

export const loginUser = async (req, res) => {};
