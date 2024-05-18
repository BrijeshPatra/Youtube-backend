const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadVideo, getVideos } = require('../controllers/videocontroller.js');
const authenticateToken = require('../middlewares/auth');

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', authenticateToken, upload.single('video'), uploadVideo);
router.get('/', getVideos);

module.exports = router;
