require('dotenv').config(); 
const app = require('./app');
const db = require('./models'); 
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('DB sincronizado com sucesso!');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
  }
}

startServer();