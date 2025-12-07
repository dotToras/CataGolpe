
import Golpe from '../models/Golpes.js';


export const criarGolpes = async (req, res) => {

    try{
        const golpe = await Golpe.create(req.body);
        res.status(201).json(golpe);
    }catch(err) {
        return res.status(400).json({ erro: err.message });
    }

}
