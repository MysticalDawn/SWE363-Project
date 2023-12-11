import express from 'express';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';

let gfs;
let upload;

mongoose.connection.once('open', () => {
  // Create GridFS stream
  Grid.mongo = mongoose.mongo;
  gfs = Grid(mongoose.connection.db);
  
  // Create storage engine
  const storage = new GridFsStorage({
   url: mongoose.connection.client.s.url,
   file: (req, file) => {
     return new Promise((resolve, reject) => {
       const filename = file.originalname;
       const fileInfo = {
         filename: filename,
         bucketName: 'uploads'
       };
       resolve(fileInfo);
     });
   }
  });

  upload = multer({ storage });


const router = express.Router();

router.post('/upload-picture', upload.single('file'), (req, res) => {
  var writeStream = gfs.createWriteStream({
    filename: req.user.id + '_profile_pic' //This name is used to retrieve data
  });
  // Pipe the request file stream directly to GridFS
  req.file.stream.pipe(writeStream);
  res.send("Success!");
});

router.post('/upload-cv', upload.single('file'), (req, res) => {
  var writeStream = gfs.createWriteStream({
    filename: req.user.id + '_CV' //This name is used to retrieve data 
  });
  // Pipe the request file stream directly to GridFS
  req.file.stream.pipe(writeStream);
  res.send("Success!");
});
});
//export { router as UploadRouter };
