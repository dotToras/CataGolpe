import mongoose from "mongoose";
import jwt from "jsonwebtoken"; 

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true,  trim: true, lowercase: true,},
    senha: { type: String, required: true, minlength: 6, select: false },
    dataCadastro: { type: Date, default: Date.now, immutable: true},
}, { collection: 'Usuarios', timestamps: true });

// Método para gerar o JWT
usuarioSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { id: this._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
    return token;
};

// Método para comparar a senha (agora uma simples comparação de string)
usuarioSchema.methods.matchPassword = function(senhaDigitada) {
    // A comparação é feita diretamente, sem hash.
    return senhaDigitada === this.senha;
};
const Usuario = mongoose.model("Usuario", usuarioSchema, 'Usuarios');

export default Usuario;