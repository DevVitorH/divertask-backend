const { Task } = require('../models');

exports.createTask = async (req, res) => {
  try {
    const { titulo, descricao, prioridade } = req.body;
    const task = await Task.create({
      titulo,
      descricao,
      prioridade,
      userId: req.user.id 
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, prioridade, concluida } = req.body;

    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada ou não pertence a você.' });
    }

    await task.update({ titulo, descricao, prioridade, concluida });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada ou não pertence a você.' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Tarefa excluída com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};