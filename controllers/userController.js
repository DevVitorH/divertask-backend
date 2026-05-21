const { User } = require('../models');

exports.uploadFoto = async (req, res) => {
  try {
    const { fotoBase64 } = req.body;

    if (!fotoBase64) {
      return res.status(400).json({ message: 'Nenhuma imagem enviada.' });
    }

    await User.update(
      { fotoPerfil: fotoBase64 },
      { where: { id: req.user.id } }
    );

    res.status(200).json({ 
      message: 'Foto atualizada com sucesso!', 
      fotoPerfil: fotoBase64 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPerfil = async (req, res) => {
  try {
    // Busca apenas o nome de usuário e a foto do banco de dados
    const user = await User.findByPk(req.user.id, {
      attributes: ['username', 'fotoPerfil'] 
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
};