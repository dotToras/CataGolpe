import express from 'express'
import{ fazerLogin } from '../controllers/usuarioController.js'


const router = express.Router();

// Rotas
router.post('/', fazerLogin);

export default router;