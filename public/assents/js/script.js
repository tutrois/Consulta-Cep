    //Constante para a mascara de verificação númerica.
const validaCep = /^[0-9]{8}$/;
const valida = /[_/\\a-zA-Z]/;

//Função de Validação da label CEP
function validacao(event) {
    //Recebo o evendo de Click no botão enviar e substituo todos as letras e caracteres por espaços em branco.
    var cep = $("#label_cep").val().replace(/\D/g,'');
    
    //Funções de varredura.
    if (cep != "") {
        //validação com a mascara de verificação. Se tiver 8 caracters e for apenas números = true;
        
        if (validaCep.test(cep)) {
            //----------------------------------------------------------------
                getCep(cep);
            //----------------------------------------------------------------
        }else if (valida.test(cep)) {
            document.getElementById('retorno').innerHTML = `
            <h4>!! TEM LETRAS!!</h1>
            `;
        } else if (cep.length > 8) {
            document.getElementById('retorno').innerHTML = `
                    <h4>!! CEP FORA DO PADRÃO !!</h1>
                    <p>Seu cep contem um numero a mais que o padrão.</p>
                    `;

        } else if (cep.length < 8) {
            document.getElementById('retorno').innerHTML = `
                    <h4>!! CEP FORA DO PADRÃO !!</h1>
                    <p>Seu cep contem menos números que o padrão.</p>
                    `;

        } else {
            document.getElementById('retorno').innerHTML = `
                    <h4>!! ERRO !!</h1>
                    <p>aconteceu algo inesperado, contate o administrador do sistema</p>
                    `;
        }
    } else {
        document.getElementById('retorno').innerHTML = `
                <p>Campo Vazio</p>
                `;
    }
};


function getCep(cep){
    let cont = {cep: cep};
    const options = {
        method: 'POST',
        headers: new Headers({'Content-type': 'application/json'}),
        body: JSON.stringify(cont)
    }

    fetch("http://localhost:3000/cep", options)
            .then(res => {
                return res.json();
            }).then(json =>{
                let posts = JSON.parse(json); 
                console.log(posts);
                
                document.getElementById('retorno').innerHTML = `
                <h4>!! ${posts.cep} !!</h1>
                `;
            });
}


//Chamada do botão Enviar!
$(document).ready(function () {
    //retorna a função @validacao; 
    $("#btnCep").on('click', validacao);
});