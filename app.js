const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
// 1. Adicione a importação aqui:
const atividadeRoutes = require('./routes/atividadeRoutes');

const app = express();
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);
// 2. Adicione o uso da rota aqui:
app.use('/api', atividadeRoutes);

module.exports = app;