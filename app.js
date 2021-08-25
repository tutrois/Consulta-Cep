//Constantes de Requisição;
    const express = require('express');
    const path = require('path');
    const apiRoute = require('./src/routes/cep.js');
//Constantes de Configuração e realocação;
    const app = express();
    const PORT =  3000; //Definição da porta do servidor;
//----------------------------------------------------------------

//Definindo repositorio de rotas da requisição CEP;
app.use("/cep", apiRoute);

//Definindo os parametros de pasta publica;
app.use(express.static(path.join(__dirname,'public')));

//Definindo parametros de requisição ao Jquery e Bootstrap;
app.use("/css",express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')));
app.use("/js",express.static(path.join(__dirname,'/node_modules/jquery/dist')));
app.use("/js",express.static(path.join(__dirname,'/node_modules/bootstrap/dist/js')));

//Configuração da porta do servidor;
    app.listen(PORT, ()=> {
        console.log ("Servidor incializado com sucesso na porta: ", PORT);
    });