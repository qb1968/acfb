import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| AUTH MIDDLEWARE
|--------------------------------------------------------------------------
*/

const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({
        message: "Admin account not found",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const valid = await bcrypt.compare(password, admin.password);

    if (!valid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
|--------------------------------------------------------------------------
| CREATE ADMIN
|--------------------------------------------------------------------------
| Only an authenticated admin can create another admin.
|--------------------------------------------------------------------------
*/

router.post("/create-admin", authenticateAdmin, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const existingAdmin = await Admin.findOne({
      email: cleanEmail,
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "An admin with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      email: cleanEmail,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);

    res.status(500).json({
      message: "Error creating admin",
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET ALL ADMINS
|--------------------------------------------------------------------------
| Only authenticated admins can view the admin list.
|--------------------------------------------------------------------------
*/

router.get("/admins", authenticateAdmin, async (req, res) => {
  try {
    const admins = await Admin.find({})
      .select("_id email createdAt")
      .sort({ createdAt: -1 });

    res.json(
      admins.map((admin) => ({
        id: admin._id,
        email: admin.email,
        createdAt: admin.createdAt,
        isCurrentAdmin: admin._id.toString() === req.admin._id.toString(),
      })),
    );
  } catch (error) {
    console.error("Get admins error:", error);

    res.status(500).json({
      message: "Error loading admins",
    });
  }
});

/*
|--------------------------------------------------------------------------
| DELETE ADMIN
|--------------------------------------------------------------------------
| Only authenticated admins can delete another admin.
| An admin cannot delete their own account.
|--------------------------------------------------------------------------
*/

router.delete("/admins/:id", authenticateAdmin, async (req, res) => {
  try {
    const adminId = req.params.id;

    // Prevent deleting yourself
    if (adminId === req.admin._id.toString()) {
      return res.status(400).json({
        message: "You cannot delete your own admin account",
      });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    await Admin.findByIdAndDelete(adminId);

    res.json({
      message: "Admin deleted successfully",
      id: adminId,
    });
  } catch (error) {
    console.error("Delete admin error:", error);

    res.status(500).json({
      message: "Error deleting admin",
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET CURRENT ADMIN
|--------------------------------------------------------------------------
*/

router.get("/me", authenticateAdmin, async (req, res) => {
  res.json({
    id: req.admin._id,
    email: req.admin.email,
  });
});

export default router;
