import express from 'express';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import { UserModel } from "../model/UserMdle.js";
import { fileURLToPath } from 'url';
import fs from 'fs';
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Function to delete a file
const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) reject(err);
        resolve();
      });
    } else {
      resolve();
    }
  });
};
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
      const decoded = jwt.verify(token, "secret"); // Replace with your JWT secret
      const userId = decoded.id;
      const prefix = req.route.path.includes('picture') ? 'picture' : 'cv';
      const extension = path.extname(file.originalname);
      const newFilename = `${prefix}-${userId}${extension}`;
      cb(null, newFilename);
    } catch (error) {
      cb(error);
    }
  },
});

const upload = multer({ storage: storage });



const handleFileUpload = async (req, res, fileField) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const filePath = `/assets/${req.file.filename}`;
  const decoded = jwt.verify(req.headers.authorization.split(" ")[1], "secret");
  const userId = decoded.id;

  try {
    const user = await UserModel.findById(userId);
    /*
    if (user && user[fileField]) {
      await deleteFile(path.join(__dirname, 'assets', user[fileField].split('/assets/')[1]));
    }
*/
    const update = {};
    update[fileField] = filePath;
    await UserModel.findByIdAndUpdate(userId, update);

    res.json({ filePath });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

router.post('/upload-picture', upload.single('file'), (req, res) => {

  handleFileUpload(req, res, 'profile_pic');
});

router.post('/upload-cv', upload.single('file'), (req, res) => {
  handleFileUpload(req, res, 'CV');
});

export { router as UploadRouter };