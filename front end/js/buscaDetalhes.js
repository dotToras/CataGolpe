function obterIdDaURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function formatarData(data) {
    if (!data) return "—";
    return new Date(data).toLocaleDateString("pt-BR");
}


async function buscarDetalhes(id) {

    const URL = `http://localhost:3000/api/golpes/${id}`;

    try {
        const resposta = await fetch(URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar detalhes (status " + resposta.status + ")");
        }

        const dados = await resposta.json();
        preencherDetalhes(dados.data.golpe); 
        anexarEventosVotoDetalhes(id);        
    } catch (error) {
        console.error(error.message);
    }
}


function preencherDetalhes(g) {


    document.querySelector(".tipo-golpe-detalhe").textContent = g.tipo.toUpperCase();

    const status = document.querySelector(".golpeStatus");
    status.classList.add(g.statusVeracidade);
    status.innerHTML = `<i class="fas fa-check-circle"></i> ${g.statusVeracidade}`;

    document.querySelector(".titulo-detalhe").textContent = g.nome;


    document.querySelector(".detalhe-metadados").innerHTML = `
        <p><strong><i class="fas fa-calendar-alt"></i> Data do Registro:</strong> ${formatarData(g.dataCadastro) || "-"}</p>
        <p><strong><i class="fas fa-calendar-day"></i> Ocorrência Estimada:</strong> ${formatarData(g.dataOcorrencia) || "-"}</p>
        <p><strong><i class="fas fa-user-circle"></i> Criado por:</strong> ${g.criadoPor || "—"}</p>
    `;


    document.querySelector(".secao-descricao p").textContent = g.descricao;
    document.querySelector(".secao-referencia a").href = g.linkReferencia || "#";

    document.querySelector(".btn-confirmar .contador-votos").textContent = g.votosConfirmacao;
    document.querySelector(".btn-negar .contador-votos").textContent = g.votosNegacao;
}

// Função para anexar os eventos de clique aos botões de voto
function anexarEventosVotoDetalhes(idGolpe) {
    const btnConfirmar = document.querySelector(".btn-confirmar");
    const btnNegar = document.querySelector(".btn-negar");

    btnConfirmar.onclick = () => atualizarVotos(idGolpe, "confirmacao").then(() => buscarDetalhes(idGolpe));
    btnNegar.onclick = () => atualizarVotos(idGolpe, "negacao").then(() => buscarDetalhes(idGolpe));
}

const id = obterIdDaURL();
buscarDetalhes(id);
