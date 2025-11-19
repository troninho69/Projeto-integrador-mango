import app from "./src/app.js";
import sequelize from "./src/config/database.js";

import "./src/models/user.js";
import "./src/models/song.js";
import "./src/models/album.js";
import "./src/models/associations.js";

const PORT = 3000

async function startServer() {
    try {
        await sequelize.sync();

        console.log('Conectado com sucesso ao banco de dados!');

        app.listen(PORT, () => {
            console.log(`Server está rodando em http:localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Não Conseguimos conectar ao banco de dados, veja o erro a seguir:')
        console.error('Detalhes do erro:', error.message);
        console.error(error);
    }
}

startServer();

