import express from 'express';
import multer from 'multer';
import path from 'path';
import { UserModel } from "../model/UserMdle.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, path.join(__dirname, 'assets'));
 },
 filename: function(req, file, cb) {
 cb(null, file.fieldname + '-' + Date.now() + "test");
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
