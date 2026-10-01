import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { authenticateToken, AuthenticatedRequest } from "../middleware/authMiddleware";
const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { phone, email, password } = req.body;

    // Check required fields
    if (!phone || !email || !password) {
      return res.status(400).json({
        message: "Phone, email and password are required",
      });
    }

    // Check password length
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    // Check if phone already exists
    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
      return res.status(409).json({
        message: "Phone number is already registered",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      phone,
      email,
      passwordHash,
    });

    return res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        phone: user.phone,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});


router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check password
    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check account status
    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        message: "Account is not active",
      });
    }

    // Get JWT secret
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.status(500).json({
        message: "JWT secret is not configured",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        phone: user.phone,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get(
  "/me",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await User.findById(req.user?.userId).select(
        "-passwordHash"
      );

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "Protected route accessed successfully",
        user,
      });
    } catch (error) {
      console.error("Get user error:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);
export default router;