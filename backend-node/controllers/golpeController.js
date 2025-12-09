import Golpe from '../models/Golpes.js';


export const criarGolpes = async (req, res) => {

    try {

        const golpe = await Golpe.create(req.body);
        res.status(201).json(golpe);

    } catch(err) {
        return res.status(400).json({ erro: err.message });
    }

}


export const buscarGolpes = async (req, res) => {

    try {

        const { termo, tipo, statusVeracidade} = req.query;

        const filtro = {};

        if (termo) {
            // Cria uma expressão regular (Regex) case-insensitive para buscar o termo
            const termoBusca = new RegExp(termo, 'i');

           
            filtro.$or = [
                { nome: termoBusca },
            ];
        }

        if(tipo) {
            filtro.tipo = tipo;
        }

        if(statusVeracidade) {
            filtro.statusVeracidade = statusVeracidade;
        }

        const golpes = await Golpe.find(filtro);
            res.status(200).json({
            results: golpes.length,
            data: { golpes },
         });

    } catch(err) {
        return res.status(400).json({ erro: err.message });
    }

}

export const buscarGolpeEspecifico = async (req, res) => {

    try{

        const { id } = req.params;

        const golpe = await Golpe.findById(id);

        res.status(200).json({
            data: { golpe }
        });

    }  catch(err) {
        return res.status(400).json({ erro: err.message });
    }
}

export const votarGolpes = async (req, res) => {
    try{

        const { id } = req.params
        const { voto } = req.body

        let votacao = {};

        // verifica qual o tipo de voto
        if(voto) {
            if(voto == "confirmacao") {
                votacao.votosConfirmacao = 1;
            }
            if(voto == "negacao"){
                votacao.votosNegacao = 1;
            }
        }

        const golpeVotar = await Golpe.findByIdAndUpdate(
            id,
            { $inc : votacao}, // incrementa confirmacao ou negacao a depender do array
            { new : true}
        )

        const golpeFinal = await recalcularStatus(golpeVotar);
        
        return res.status(200).json(golpeVotar);
    } catch(err) {
        return res.status(400).json({ erro: err.message });
    }
}

const recalcularStatus = async (golpe) => {
    
    const diferencaVotos = golpe.votosConfirmacao - golpe.votosNegacao;
    let novoStatus = golpe.statusVeracidade; // Mantém o status atual por padrão

    const limiteConfirmacao = 5;
    const limiteNegacao = -5;

    if (diferencaVotos >= limiteConfirmacao) {
        novoStatus = 'confirmado';
    } else if (diferencaVotos <= limiteNegacao) {
        novoStatus = 'negado';
    } else {
        novoStatus = 'suspeito'; // Mantém suspeito se estiver dentro do limite
    }

    // Se o status mudou, atualize o documento no banco de dados
    if (novoStatus !== golpe.statusVeracidade) {
        return Golpe.findByIdAndUpdate(
            golpe._id,
            { statusVeracidade: novoStatus },
            { new: true }
        );
    }
    
    // Se não houve mudança, retorna o documento original
    return golpe;
};
