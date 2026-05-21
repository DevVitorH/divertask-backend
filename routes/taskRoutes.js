// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// O middleware é aplicado a TODAS as rotas abaixo automaticamente
router.use(authenticateToken);

router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;