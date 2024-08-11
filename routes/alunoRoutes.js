const express = require('express');
const router = express.Router();
const alunoController = require("../controllers/alunoController");
const authenticationToken = require('../middleware/authMiddleware');

router.get('/', alunoController.usuarios);
router.post('/cadastro', alunoController.novoUsuario);
router.post('/login', alunoController.loginUsuario);

router.get('/profile', authenticationToken, (req, res) => {
    res.json(
        {
        message: `Seja bem-vindo(a), ${req.user.nome}`
        
    })
    
})

module.exports = router;