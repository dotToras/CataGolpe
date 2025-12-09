const btnAbrirModal = document.querySelector(".btnCadastro");
const spanFechar = document.querySelector(".close-button");
const formCadastro = document.getElementById("formCadastroGolpe");


// Funções para controle de modais
function mostrarModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) modal.style.display = 'block';
}

function fecharModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) modal.style.display = 'none';
}

// Lógica de Fechar o modal ao clicar fora da área de conteúdo
window.onclick = function(event) {
  // Verifica se o elemento clicado (event.target) é um modal (a área escura)
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
}

// Ligar o botão "Registrar Golpe" para abrir o modal
document.addEventListener('DOMContentLoaded', () => {
    const btnAbrirModal = document.querySelector(".btnCadastro");
    if (btnAbrirModal) {
        btnAbrirModal.onclick = function() {
            mostrarModal("modalCadastro");
        }
    }
});

const botoesFechar = document.querySelectorAll(".close-button");

botoesFechar.forEach(span => {
    span.addEventListener('click', (event) => {
        
        const modalElement = event.target.closest('.modal');
        if (modalElement) {
            fecharModal(modalElement.id);
        }
    });
});

// Parte referente ao formulário de cadastro

// Função para cadastrar golpes
async function cadastrarGolpe(event) {

    event.preventDefault();
    const dataForms = new FormData(formCadastro); // objeto com os dados enviados pelo forms

    const URL = `http://localhost:3000/api/golpes/`;
    const dadosObjeto = Object.fromEntries(dataForms.entries());
    const usuarioToken = localStorage.getItem('usuarioToken');

    if(!usuarioToken) {
        alert("É necessário estar logado para votar");
    }
     try {

        const respostaGolpe = await fetch(URL, {
          method: 'POST',
          headers: {
                'Content-Type': 'application/json' ,
                'Authorization': `Bearer ${usuarioToken}`,
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
        buscarGolpe(event);
        formCadastro.reset();
        fecharModal('modalCadastro');
        
     } catch(error) {
        console.error(error.message);
     }
     
}
