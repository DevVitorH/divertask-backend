require('dotenv').config(); // Carrega as variáveis do arquivo .env (como o JWT_SECRET)
const app = require('./app');
const db = require('./models'); // Importa o Sequelize e seus modelos
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Sincroniza os Modelos com o MySQL (cria a tabela de usuários automaticamente se não existir)
    await db.sequelize.sync({ alter: true });
    console.log('DB sincronizado com sucesso!');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
  }
}

startServer();