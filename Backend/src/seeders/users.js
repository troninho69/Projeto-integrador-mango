// node .\Backend\src\seeders\users.js 

import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import createUserModel from '../models/users.js'; 

// mover para config/db.js
const sequelize = new Sequelize('mango_db', 'root', 'aluno', {
  host: 'localhost',
  dialect: 'mysql'
});



const User = createUserModel(sequelize);

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const users = [
      {
        name: 'João Silva',
        username: 'joao',
        email: 'joao@example.com',
        password: await bcrypt.hash('123456', 10),
      },
      {
        name: 'Maria Souza',
        username: 'maria',
        email: 'maria@example.com',
        password: await bcrypt.hash('senha123', 10),
      },
      {
        name: 'Carlos Lima',
        username: 'carlos',
        email: 'carlos@example.com',
        password: await bcrypt.hash('abc12345', 10),
      },
    ];

    await User.bulkCreate(users);

    console.log('Seed executado com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao executar seed:', err);
    process.exit(1);
  }
}

seed();
