const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const port = 8092;
const alunoRoutes = require("./routes/alunoRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use('/alunos', alunoRoutes);


app.listen(port, () => {
    try {
        console.log(`Servidor rodando no link http://localhost:${port}`)
    } catch (error) {
        console.log(`Erro ao iniciar o servidor`, error)
    }
})