import express from 'express';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import mongoose from 'mongoose';
import crypto from 'crypto';
import path from 'path';

const router = express.Router();
const mongoURI = "mongodb+srv://mystical:123@swe363.lzyffx0.mongodb.net/swe363?retryWrites=true&w=majority"; // Use the same URI as in your main server file

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = (req.body.fileName || 'file') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads' // The collection name to use in MongoDB
          
        };
        resolve(fileInfo);
      });
    });
  }
});
storage.on('connection', (db) => {
  console.log('GridFsStorage connected successfully!');
});

storage.on('connectionFailed', (err) => {
  console.error('GridFsStorage connection failed:', err);
});
const upload = multer({ storage });

router.post('/upload-picture', upload.single('file'), (req, res) => {
  console.log("we here")
  if (!req.file) {
    return res.status(400).send('No file uploaded.');

  }
  res.send("Picture uploaded successfully!");
});

router.post('/upload-cv', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send("CV uploaded successfully!");
});

export { router as UploadRouter };