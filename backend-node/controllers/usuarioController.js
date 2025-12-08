import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuarios.js'

export const fazerLogin = async (req, res) => {

    const { email, senha } = req.body;

    try {
    const usuario = await Usuario.findOne({email}).select('+senha');

    // verifica se huve retorno de usuario
    if (!usuario) {
        return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    // verifcando a senha
    if (senha !== usuario.senha) {
        return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    // devpolvendo o token  na resposta
    const token = usuario.generateAuthToken(); 
        
    return res.status(200).json({
        mensagem: 'Login bem-sucedido!',
        token: token
    });

} catch(err) {
    return res.status(400).json({ erro: err.message });
}
   

}