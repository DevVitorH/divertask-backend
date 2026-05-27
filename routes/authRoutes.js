const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/protected', authenticateToken, (req, res) => {
  res.json({
    message: `Olá, ${req.user.username}! Você conseguiu acessar a rota secreta.`,
    role: req.user.role
  });
});

module.exports = router;