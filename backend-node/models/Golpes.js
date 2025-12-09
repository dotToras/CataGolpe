import mongoose from "mongoose";


const golpeSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: {type: String, required: true},
    tipo: {type: String, required: true, 
        enum: {
            values: ['phishing', 'falso boleto', 'WhatsApp', 'Instagram', 'e-mail', 'outros'],
            message: 'Tipo de golpe inválido.'
        }},
    dataOcorrencia: { type: Date, default: Date.now},
    statusVeracidade: { type: String, enum: ['confirmado', 'suspeito', 'negado'], default: 'suspeito' },
    votosConfirmacao: { type: Number, default: 0, min: 0 },
    votosNegacao: { type: Number, default: 0, min: 0 },
    dataCadastro: { type: Date, default: Date.now, immutable: true },
    linkReferencia: { type: String, trim: true, default: null },
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Usuario",
        required: true 
    },

}, { collection: 'Golpes', timestamps: true});

const Golpes = mongoose.model("Golpe", golpeSchema, 'Golpes');

export default Golpes;
