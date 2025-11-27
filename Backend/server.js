import express from 'express';
import sequelize from './src/db/db.js';

const app = express();
const port = 3000;

// Middleware para ler JSON
app.use(express.json());

// Teste de rota inicial
app.get('/', (req, res) => {
  res.send('Servidor on');
});

// Conexão com o banco
sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados!'))
  .catch(err => console.error('Erro de conexão:', err));

// Sincroniza tabelas (opcional, útil no desenvolvimento)
sequelize.sync({ alter: true })
  .then(() => console.log('Tabelas sincronizadas!'))
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
