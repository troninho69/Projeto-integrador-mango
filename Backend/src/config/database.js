import { Sequelize } from "sequelize";

const sequelize = new Sequelize('mango_db', 'root', 'aluno',{
    host: 'localhost',
    dialect: 'mysql'
});

async function  Connection() {
    try {
        await sequelize.authenticate();
        console.log('Banco de dados conectado.');
    } catch (error) {
        console.error('Incapaz de conectar ao banco de dados:', error);
    }
}

Connection();

export default sequelize