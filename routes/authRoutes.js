const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Rotas públicas (não precisam de token)
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rota protegida de teste (exige o token)
router.get('/protected', authenticateToken, (req, res) => {
  res.json({
    message: `Olá, ${req.user.username}! Você conseguiu acessar a rota secreta.`,
    role: req.user.role
  });
});

module.exports = router;