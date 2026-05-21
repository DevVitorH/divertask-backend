const { Atividade } = require('../models');

exports.getAtividades = async (req, res) => {
  try {
    const atividades = await Atividade.findAll({ where: { userId: req.user.id } });
    res.json(atividades);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar atividades' });
  }
};

exports.createAtividade = async (req, res) => {
  try {
    const { atividade, horario } = req.body;
    const novaAtividade = await Atividade.create({
      atividade,
      horario,
      userId: req.user.id // Pega o ID do token JWT
    });
    res.status(201).json(novaAtividade);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar atividade' });
  }
};

exports.updateAtividade = async (req, res) => {
  try {
    const { id } = req.params;
    const [atualizado] = await Atividade.update(req.body, { where: { id, userId: req.user.id } });
    if (atualizado) {
      const atividadeAtualizada = await Atividade.findOne({ where: { id } });
      return res.status(200).json(atividadeAtualizada);
    }
    throw new Error('Atividade não encontrada');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAtividade = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await Atividade.destroy({ where: { id, userId: req.user.id } });
    if (deletado) {
      return res.status(200).send("Atividade deletada");
    }
    throw new Error('Atividade não encontrada');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};