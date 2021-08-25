//Constantes de Requisição

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const api = require('../models/api');
const axios = require('axios');

// ----------------------------------------------------------------

//Constantes de Configuração e realocação

//const cep = require('../controllers/cepController');
const router = express.Router();

// --------------------------    MIDWARES   --------------------------------------

function cepteste(req, res){
    let cep = req.body.cep;
   handleViaCep(cep, resultado);

   
    function resultado (resu){
        console.log(JSON.stringify(resu.data));
        //console.log(resu);
        //console.log(resu.data);
        res.json(JSON.stringify(resu.data));
    }
};



function handleViaCep(req, res){ 
    axios.get(`https://viacep.com.br/ws/${req}/json/`)
    .then(res)
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        console.log('terminado');
    });  
}



// --------------------------    ROTAS   --------------------------------------

//usando o cors.
router.use(cors());

router.post("/", bodyParser.json(), cepteste);

module.exports = router;