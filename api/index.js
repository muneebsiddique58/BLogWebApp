// api/index.js
import express from "express";
import postroutes from "./routes/posts.js";
import userroutes from "./routes/users.js";
import authroutes from "./routes/auth.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import multer from "multer";
import { fileURLToPath } from "url"; // ✅ Added for ES Module path handling
import { dirname } from "path";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// ✅ Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Fixed path to upload directory (inside client/public/upload)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../client/youtube2022/public/upload")); // ✅ Updated path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Upload API
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

// ✅ API routes
app.use("/api/posts", postroutes);
app.use("/api/users", userroutes);
app.use("/api/auth", authroutes);

app.listen(8800, () => {
  console.log("✅ Backend running on http://localhost:8800");
});
