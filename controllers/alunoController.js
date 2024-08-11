const bcrypt = require('bcrypt');
const database = require("../config/conexaoConfig");
const tabela = `tb_aluno`;
const jwt = require("jsonwebtoken");

const usuarios = async (req, res) => {
    const dados = await database.executar(`SELECT * FROM ${tabela}`);
    res.send(dados);
}

const novoUsuario = async (req, res) => {
    const {name, email, password} = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const dados = `INSERT INTO ${tabela} (name, email, password) VALUES (?, ?, ?);`;
    await database.executar(dados, [name, email, hashedPassword]);

    res.status(201).json({
        message: "Usuario cadastrado com sucesso"
    });
}

const loginUsuario = async (req, res) => {
    const {email, password} = req.body;

    const dados = `SELECT * FROM ${tabela} WHERE email = ?`;
    const [user] = await database.executar(dados, [email]);

    if(!user){
        return res.status(401).json(
            {
                message: "Credenciais invalidas"
            }
        )
    }

    const converter = await bcrypt.compare(password, user.password)

    if(!converter){
        return res.status(401).json(
            {
                message: "Credenciais invalidas"
            }
        )
    }

    const token = jwt.sign(
        {id: user.id, email: user.email, nome: user.name},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    )

    res.status(200).json({
        message: "Login bem-sucedido",
        token
    })
};

module.exports = {
    usuarios,
    novoUsuario,
    loginUsuario 
}