//Constantes de Requisição
const axios = require('axios');

// --------------------------   API ViaCep  --------------------------------------
//Requisição de dados via ApiCep
module.exports = {
    handleViaCep(req, res) {
        //Recebendo dados via já tratado e importando a URL da API.
        axios.get(`https://viacep.com.br/ws/${req}/json/`)
            .then(res)//Retornando JSON recebdo via api
            .catch(function (error) {
                console.log(error);//Loh de erro, caso acontece alguma coisa na solicitação 
            }).then(function () {
                console.log('!!! Axios concluido !!!');//Retorno de termino do processo de requisição.
            });
    }
}