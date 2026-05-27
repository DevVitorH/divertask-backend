const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const atividadeRoutes = require('./routes/atividadeRoutes');

const app = express();
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', userRoutes);
app.use('/api', atividadeRoutes);

module.exports = app;