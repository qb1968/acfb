import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import WomenMember from "../models/WomenMember.js";

const router = express.Router();

/* =========================================================
UPLOAD DIRECTORY
========================================================= */

const uploadDir = "uploads/women-members";

if (!fs.existsSync(uploadDir)) {
fs.mkdirSync(uploadDir, { recursive: true });
}

/* =========================================================
MULTER CONFIGURATION
========================================================= */

const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, uploadDir);
},

filename: (req, file, cb) => {
const ext = path.extname(file.originalname);


const filename =
  Date.now() +
  "-" +
  Math.round(Math.random() * 1e9) +
  ext;

cb(null, filename);


},
});

const upload = multer({
storage,

limits: {
fileSize: 10 * 1024 * 1024,
},

fileFilter: (req, file, cb) => {
const allowedTypes = /jpeg|jpg|png|webp|gif/;


const ext = path
  .extname(file.originalname)
  .toLowerCase();

const mime = file.mimetype;

if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
  cb(null, true);
} else {
  cb(
    new Error(
      "Only JPG, JPEG, PNG, WEBP, and GIF images are allowed."
    )
  );
}


},
});

/* =========================================================
GET ALL WOMEN MEMBERS
========================================================= */

router.get("/", async (req, res) => {
try {
const members = await WomenMember.find().sort({
order: 1,
name: 1,
});


res.json(members);


} catch (error) {
console.error("Get women members error:", error);


res.status(500).json({
  message: "Unable to load women members.",
});


}
});

/* =========================================================
CREATE WOMEN MEMBER
========================================================= */

router.post("/", upload.single("image"), async (req, res) => {
try {
const {
name,
title,
location,
bio,
order,
} = req.body;


/* NAME IS REQUIRED */

if (!name || !name.trim()) {
  return res.status(400).json({
    message: "Member name is required.",
  });
}

let image = "";

if (req.file) {
  image = `/uploads/women-members/${req.file.filename}`;
}

const member = new WomenMember({
  name: name.trim(),
  title:title || "",
  location: location || "",
  bio: bio || "",
  order: Number(order) || 99,
  image,
});

await member.save();

res.status(201).json(member);


} catch (error) {
console.error("Create women member error:", error);


res.status(500).json({
  message: error.message || "Unable to create women member.",
});


}
});

/* =========================================================
UPDATE WOMEN MEMBER
========================================================= */

router.put(
"/:id",
upload.single("image"),
async (req, res) => {
try {
const member = await WomenMember.findById(
req.params.id
);


  if (!member) {
    return res.status(404).json({
      message: "Women member not found.",
    });
  }

  const {
    name,
    title,
    location,
    bio,
    order,
  } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: "Member name is required.",
    });
  }

  member.name = name.trim();
  member.title = title || "";
  member.location = location || "";
  member.bio = bio || "";
  member.order = Number(order) || 99;

  /* Replace image only if a new image was uploaded */

  if (req.file) {
    member.image = `/uploads/women-members/${req.file.filename}`;
  }

  await member.save();

  res.json(member);
} catch (error) {
  console.error("Update women member error:", error);

  res.status(500).json({
    message:
      error.message ||
      "Unable to update women member.",
  });
}


}
);

/* =========================================================
DELETE WOMEN MEMBER
========================================================= */

router.delete("/:id", async (req, res) => {
try {
const member = await WomenMember.findById(
req.params.id
);


if (!member) {
  return res.status(404).json({
    message: "Women member not found.",
  });
}

/* Delete associated image */

if (member.image) {
  const imagePath = member.image.startsWith("/")
    ? member.image.substring(1)
    : member.image;

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }
}

await WomenMember.findByIdAndDelete(req.params.id);

res.json({
  message: "Women member deleted successfully.",
});


} catch (error) {
console.error("Delete women member error:", error);


res.status(500).json({
  message: "Unable to delete women member.",
});


}
});

/* =========================================================
MULTER ERROR HANDLER
========================================================= */

router.use((error, req, res, next) => {
if (error instanceof multer.MulterError) {
return res.status(400).json({
message: error.message,
});
}

if (error) {
return res.status(400).json({
message: error.message,
});
}

next();
});

export default router;
