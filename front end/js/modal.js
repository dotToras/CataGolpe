const modal = document.getElementById("modalCadastro");
const btnAbrirModal = document.querySelector(".btnCadastro");
const spanFechar = document.querySelector(".close-button");
const formCadastro = document.getElementById("formCadastroGolpe");


// Função para Abrir o Modal
btnAbrirModal.onclick = function() {
  modal.style.display = "block";
}

// Função para Fechar o Modal clicando no 'X'
spanFechar.onclick = function() {
  modal.style.display = "none";
}

// Função para Fechar o Modal clicando fora dele
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Parte referente ao formulário de cadastro

// Função para cadastrar golpes
async function cadastrarGolpe(event) {

    event.preventDefault();
    const dataForms = new FormData(formCadastro); // objeto com os dados enviados pelo forms

    const URL = `http://localhost:3000/api/golpes/`;
    const dadosObjeto = Object.fromEntries(dataForms.entries());
     try {

        const respostaGolpe = await fetch(URL, {
          method: 'POST',
          headers: {
                'Content-Type': 'application/json' 
            },
            // Envia os dados como uma string JSON
          body: JSON.stringify(dadosObjeto)
          
        });
        
        if(!respostaGolpe.ok) {
            throw new Error(`Resposta status: ${respostaGolpe.status}`);
        }

        const dados = await respostaGolpe.json();
        
        console.log("Dados cadastro:", dados);
        alert("Golpe registrado com sucesso!");
        formCadastro.reset();
        
     } catch(error) {
        console.error(error.message);
     }
     
}
