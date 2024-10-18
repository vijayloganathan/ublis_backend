import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

// Define storage for local files in ../assets/documents
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../assets/documents')); // Folder where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files from the "../assets/documents" directory
app.use('/documents', express.static(path.join(__dirname, '../assets/documents')));

// Function to store the document
const storeDocument = (req: Request, res: Response) => {
  upload.single('document')(req, res, (err: any) => {
    if (err) {
      return res.status(500).send(`Error uploading file: ${err.message}`);
    }
    if (req.file) {
      res.send(`File uploaded successfully: ${req.file.filename}`);
    } else {
      res.status(400).send('No file uploaded.');
    }
  });
};

// Function to view the document
const viewDocument = (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../assets/documents', filename);

  // Check if file exists
  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).send('File not found.');
  }
};

// // Route for file upload
// app.post('/upload', storeDocument);

// // Route to view the document by its filename
// app.get('/view/:filename', viewDocument);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
