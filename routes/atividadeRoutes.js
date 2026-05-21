const express = require('express');
const router = express.Router();
const atividadeController = require('../controllers/atividadeController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Protege todas as rotas de atividades
router.use(authenticateToken);

router.get('/activities', atividadeController.getAtividades);
router.post('/activities', atividadeController.createAtividade);
router.put('/activities/:id', atividadeController.updateAtividade);
router.delete('/activities/:id', atividadeController.deleteAtividade);

module.exports = router;