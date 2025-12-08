import express from 'express'
import{ fazerLogin, criarUsuario } from '../controllers/usuarioController.js'


const router = express.Router();

// Rotas
router.post('/login', fazerLogin);
router.post('/', criarUsuario);

export default router;