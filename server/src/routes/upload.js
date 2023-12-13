import express from 'express';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import { UserModel } from "../model/UserMdle.js";
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'assets'));
  },
  filename: (req, file, cb) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return cb(new Error('No token provided'));
    }

    try {
      const decoded = jwt.verify(token, "secret"); // Replace "secret" with your actual secret key
      const userId = decoded.id;
      const extension = path.extname(file.originalname);
      const newFilename = `${file.fieldname}-${userId}${extension}`;
      cb(null, newFilename);
    } catch (error) {
      cb(error);
    }
  },
});

const upload = multer({ storage: storage });

router.post('/upload-picture', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const filePath = `/assets/${req.file.filename}`;
  const userEmail = req.query.email;

  try {
    await UserModel.findOneAndUpdate({ email: userEmail }, { profile_pic: filePath });
    res.json({ filePath });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/upload-cv', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const filePath = `/assets/${req.file.filename}`;
  const userEmail = req.query.email;

  try {
    await UserModel.findOneAndUpdate({ email: userEmail }, { CV: filePath });
    res.json({ filePath });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

export { router as UploadRouter };
