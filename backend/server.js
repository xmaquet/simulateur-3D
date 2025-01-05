const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Configuration CORS
const cors = require('cors');
app.use(cors());

app.use(express.json());
//app.use(express.static('public'));
//app.use('/static', express.static('public'));
// Servir les fichiers statiques depuis le dossier public/static
app.use('/static', express.static(path.join(__dirname, 'public/static')));

// Route de test
app.get('/', (req, res) => {
  res.send('Backend is running. Static files are served at /static.');
});


// Endpoint de test
app.get('/', (req, res) => {
    res.send('Backend running!');
});

// Upload d'image
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
    res.json({ message: 'Image uploaded successfully!', path: req.file.path });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));
