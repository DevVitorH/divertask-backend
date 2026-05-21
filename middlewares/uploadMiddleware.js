const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Guarda na pasta que você acabou de criar
  },
  filename: function (req, file, cb) {
    // Cria um nome único: ID do utilizador + data atual + extensão (.png, .jpg)
    cb(null, req.user.id + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;