
async function buscarGolpe(event) {

    event.preventDefault(); 
    
 
    const inputBusca = document.querySelector('.inputBusca').value;


    const URL = `http://localhost:3000/api/golpes?termo=${encodeURIComponent(inputBusca)}`;
     try {
        const respostaGolpe = await fetch(URL);
        
        if(!respostaGolpe.ok) {
            throw new Error(`Resposta status: ${respostaGolpe.status}`);
        }

        const dados = await respostaGolpe.json();
        console.log("Dados de busca recebidos:", dados);
     } catch(error) {
        console.error(error.message);
     }
     
}
