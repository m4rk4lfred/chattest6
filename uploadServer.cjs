const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3090;

const cors = require('cors');
app.use(cors());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Save with original name and timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use(express.json());

app.use('/uploads', express.static(uploadDir));

// Test endpoint
app.get('/', (req, res) => {
  res.send('Hello from Express?');
});

// Upload endpoint (single file)
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    originalname: req.file.originalname,
    path: req.file.path
  });
});

// Upload endpoint (multiple files)
app.post('/uploads', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  res.json({
    message: 'Files uploaded successfully',
    files: req.files.map(f => ({
      filename: f.filename,
      originalname: f.originalname,
      path: f.path
    }))
  });
});

app.get('/list-uploads', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to list files' });
    res.json(files);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});