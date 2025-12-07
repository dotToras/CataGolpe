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

        const { termo, tipo, statusVeracidade, votosConfirmacao, votosNegacao} = req.query;

        const filtro = {};
        const ordenacao = {};

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

        if(votosConfirmacao) {
            ordenacao.votosConfirmacao = votosConfirmacao;
        }

        if(votosNegacao) {
            ordenacao.votosNegacao = votosNegacao;
        }


        const golpes = await Golpe.find(filtro).sort(ordenacao);
            res.status(200).json({
            results: golpes.length,
            data: { golpes },
         });

    } catch(err) {
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

        return res.status(200).json(golpeVotar);
    } catch(err) {
        return res.status(400).json({ erro: err.message });
    }
}
