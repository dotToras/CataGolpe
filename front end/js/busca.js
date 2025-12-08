document.addEventListener('DOMContentLoaded', function() {
buscarGolpe(event);
});

function preencherCards(dados) {

   const cardSection = document.getElementById("cardSection");
   cardSection.innerHTML = "";
   const golpes = dados.data.golpes;
   golpes.forEach(golpe => {
      const cardHTML = `
         <div class="card">
         <div class="cardHeader">
                        <span class="golpeTipo">${golpe.tipo.toUpperCase()}</span>
                        <span class="golpeStatus confirmado"><i class="fas fa-check-circle"></i> ${golpe.statusVeracidade}</span>
                     </div>

                     <h3 class="golpeNome">${golpe.nome}</h3>

                     <div class="cardConteudo">
                        <span>Descrição</span>
                        <p>${golpe.descricao}</p>
                     </div>

                     <div class="cardFooter">
                        <div class="cardVotos">
                              <span class="votoConfirmacao"><i class="fas fa-thumbs-up"></i> ${golpe.votosConfirmacao}</span>
                              <span class="votoNegacao"><i class="fas fa-thumbs-down"></i> ${golpe.votosNegacao}</span>
                        </div>
                        <a href="#" class="btnDetalhes">Saiba Mais <i class="fas fa-arrow-right"></i></a>
                     </div>
                  </div>`;
      cardSection.innerHTML += cardHTML;
   });
}

// Função para buscar golpes
async function buscarGolpe(event) {

   event.preventDefault();

   const inputBusca = document.querySelector('.inputBusca').value;

   const URL = `http://localhost:3000/api/golpes?termo=${encodeURIComponent(inputBusca)}`;

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
