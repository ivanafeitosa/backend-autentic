const mysql2 = require("mysql2/promise");

const conectar = async () => {
    return await mysql2.createConnection({
        host: process.env.LOCALHOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: "db_escola",
        port: process.env.PORT_SERVER
    });
}

const executar = async (sql, params) => {
    const database = await conectar();
    let [result] = await database.query(sql, params);
    await database.end();
    return result;
}

module.exports = {
    conectar,
    executar
}