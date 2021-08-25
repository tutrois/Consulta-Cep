//Constantes de Requisição
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//Constantes de Configuração e realocação
const api = require('../models/apiViaCep');
const router = express.Router();

// --------------------------   Middleware   --------------------------------------

function getCep(req, res) {
    //Recebe valor do form contendo o CEP desejado
    let cep = req.body.cep;
    //Solicita dados da API ViaCep
    api.handleViaCep(cep, resultado);
    //Retorna o Resultado para o Client.
    function resultado(resu) {
        console.log(JSON.stringify(resu.data));
        res.json(JSON.stringify(resu.data));
    }
};
// --------------------------    ROTAS   --------------------------------------

//Usando o cors.
router.use(cors());
//Requesição de rota /Cep
router.post("/", bodyParser.json(), getCep);
//Export do sistema de rotas.
module.exports = router;