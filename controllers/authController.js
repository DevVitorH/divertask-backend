const bcrypt = require('bcrypt');
const { User } = require('../models');
const { generateAccessToken } = require('../utils/token');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
    }
    if (password.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres.' });
}

    // O beforeCreate do Model já vai encriptar a senha automaticamente
    const user = await User.create({ username, password });
    const token = generateAccessToken(user);

    res.status(201).json({ message: 'Conta criada com sucesso!', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Passo 1: Encontrar o usuário
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Passo 2: Comparar a senha pura com o hash do banco
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Passo 3: Gerar token de sucesso
    const token = generateAccessToken(user);
    return res.status(200).json({
      message: 'Login bem-sucedido!',
      token: token, // MUDAMOS DE accessToken PARA token!
      expiresIn: process.env.TOKEN_EXPIRATION
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};