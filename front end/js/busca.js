
function truncate(texto, limite) {
    if (!texto) return "";
    return texto.length > limite ? texto.substring(0, limite) + "..." : texto;
}

// Metodo PUT para atualizar contagem de votos
async function atualizarVotos(idGolpe, tipoVoto) {
   
    const URL = `https://catagolpe-api.onrender.com/api/golpes/${idGolpe}/`; 
    const usuarioToken = localStorage.getItem('usuarioToken');

    if(!usuarioToken) {
        alert("É necessário estar logado para votar");
    }

    const inputGolpe = {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usuarioToken}`,
        },
        body: JSON.stringify({ voto: tipoVoto }), // Envia o tipo de voto no corpo da requisição
    };

    try {
        const respostaGolpe = await fetch(URL, inputGolpe);

        if (!respostaGolpe.ok) {
            throw new Error(`Erro ao votar. Status: ${respostaGolpe.status}`);
        }

        const dadosAtualizados = await respostaGolpe.json();
        console.log("Voto registrado com sucesso:", dadosAtualizados);
        
        await buscarGolpe({ preventDefault: () => {} }); 
        
    } catch (error) {
        console.error("Erro na votação:", error.message);
    }
}

// Função para anexar os eventos de clique aos botões de voto
function anexarEventosVoto() {
    
    const botoesConfirmacao = document.querySelectorAll('.votoConfirmacao');
    const botoesNegacao = document.querySelectorAll('.votoNegacao');

    // Anexa o evento para Confirmação
    botoesConfirmacao.forEach(botao => {
        botao.addEventListener('click', () => {
            const idGolpe = botao.getAttribute('data-id');
            atualizarVotos(idGolpe, 'confirmacao');
        });
    });

    // Anexa o evento para Negação
    botoesNegacao.forEach(botao => {
        botao.addEventListener('click', () => {
            const idGolpe = botao.getAttribute('data-id');
            atualizarVotos(idGolpe, 'negacao');
        });
    });
}


// função para preencher o card
function preencherCards(dados) {

   const cardSection = document.getElementById("cardSection");
   cardSection.innerHTML = "";
   const golpes = dados.data.golpes;
   golpes.forEach(golpe => {
      const cardHTML = `
         <div class="card">
         <div class="cardHeader">
                        <span class="golpeTipo">${golpe.tipo.toUpperCase()}</span>
                        <span class="golpeStatus ${golpe.statusVeracidade}"><i class="fas fa-check-circle"></i> ${golpe.statusVeracidade}</span>
                     </div>

                     <h3 class="golpeNome">${golpe.nome}</h3>

                     <div class="cardConteudo">
                        <span>Descrição</span>
                        <p>${truncate(golpe.descricao, 120)}</p>
                     </div>

                     <div class="cardFooter">
                        <div class="cardVotos">
                              <span class="votoConfirmacao" data-id="${golpe._id}"><i class="far fa-thumbs-up"></i> ${golpe.votosConfirmacao}</span>
                              <span class="votoNegacao" data-id="${golpe._id}"><i class="far fa-thumbs-down"></i> ${golpe.votosNegacao}</span>
                        </div>
                        <a href="./html/detalhes.html?id=${golpe._id}" class="btnDetalhes">Saiba Mais <i class="fas fa-arrow-right"></i></a>
                     </div>
                  </div>`;
      cardSection.innerHTML += cardHTML;
   });

       anexarEventosVoto(); 
}

// Função para buscar golpes
async function buscarGolpe(event) {

   event.preventDefault();

   const inputBusca = document.querySelector('.inputBusca').value;

   const URL = `https://catagolpe-api.onrender.com/api/golpes?termo=${encodeURIComponent(inputBusca)}`;

   try {
      const respostaGolpe = await fetch(URL);

      if (!respostaGolpe.ok) {
         throw new Error(`Resposta status: ${respostaGolpe.status}`);
      }

      const dados = await respostaGolpe.json();
      console.log("Dados de busca recebidos:", dados);

      preencherCards(dados); 


   } catch (error) {
      console.error(error.message);
   }

}
