//Constante para a mascara de verificação númerica.
const validaCep = /^[0-9]{8}$/;
const valida = /[_/\\a-zA-Z]/;

//Função de Validação da label CEP
function validacao(event) {
    //Recebo o evendo de Click no botão enviar e substituo todos as letras e caracteres por espaços em branco.
    var cep = $("#label_cep").val().replace(/\D/g, '');

    //Funções de varredura.
    if (cep != "") {
        //validação com a mascara de verificação. Se tiver 8 caracters e for apenas números = true       
        if (validaCep.test(cep)) {
            //Enviando CEP já validado a função getCEP.
            getCep(cep);
        } else if (valida.test(cep)) {
            document.getElementById('modalResposta').innerHTML = `Erro :`
            document.getElementById('retorno').innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">CONTEÚDO CONTÉM LETRAS!</h4>
                        <hr>
                        <p>Consulta inválida por conter letras no CEP pesquisado. Por favor, digite um CEP conforme o padrão</p>
                    </div>
                    `;
        } else if (cep.length > 8) {
            document.getElementById('modalResposta').innerHTML = `Erro :`
            document.getElementById('retorno').innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">CEP FORA DO PADRÃO!</h4>
                        <hr>
                        <p>Seu CEP contém uma quantidade <b>maior</b> de números que o padrão.</p>
                    </div>
                    `;
        } else if (cep.length < 8) {
            document.getElementById('modalResposta').innerHTML = `Erro :`
            document.getElementById('retorno').innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">CEP FORA DO PADRÃO!</h4>
                        <hr>
                        <p>Seu CEP contém uma quantidade <b>menor</b> de números que o padrão.</p>
                    </div>
                    `;
        } else {
            document.getElementById('modalResposta').innerHTML = `Erro :`
            document.getElementById('retorno').innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">ERRO INESPERADO!</h4>
                        <hr>
                        <p>Aconteceu algo inesperado. Por favor, contate o administrador do sistema.</p>
                    </div>
                    `;
        }
    } else {
        document.getElementById('modalResposta').innerHTML = `Erro :`
        document.getElementById('retorno').innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <h4 class="alert-heading">CAMPO VAZIO!</h4>
                    <hr>
                    <p>Nenhuma informação foi digitada ou contém apenas letras. Por favor, preencha com um CEP válido para consulta.</p>
                </div>
                `;
    }
};

//Enviando requisição ao Serve Side com CEP já validado.
function getCep(cep) {
    let cont = {
        cep: cep
    };
    //Constante de configuração para a requisição Serve side via URL
    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-type': 'application/json'
        }),
        body: JSON.stringify(cont) // Convertendo valores em javascript para uma string JSON;
    }

    fetch("http://localhost:3000/cep", options)
        .then(res => {
            return res.json(); //Conversão JSON explicita
        }).then(json => {
            let posts = JSON.parse(json); //Analisa a string JSON, construindo o valor em um obejto.   
            //retorna o obejto padronizado a modal #retorno para visualização dos dados via Client side.  

            document.getElementById('modalResposta').innerHTML = `Endereço :`
            document.getElementById('retorno').innerHTML = `
            <div class="container">
            Cep:            ${posts.cep}            </br>
            logradouro:     ${posts.logradouro}     </br>
            complemento:    ${posts.complemento}    </br>
            bairro:         ${posts.bairro}         </br>
            localidade:     ${posts.localidade}     </br>
            uf:             ${posts.uf}             </br>
            ibge:           ${posts.ibge}           </br>
            ddd:            ${posts.ddd}            </br>
            </div>
            `;
        });
}

//Chamada do botão Enviar!
$(document).ready(function () {
    //retorna a função @validacao; 
    $("#btnCep").on('click', validacao);
});