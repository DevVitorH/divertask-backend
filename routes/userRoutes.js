const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/user/me', authenticateToken, userController.getPerfil);

// Rota protegida recebendo um JSON padrão
router.post('/perfil/foto', authenticateToken, userController.uploadFoto);

module.exports = router;