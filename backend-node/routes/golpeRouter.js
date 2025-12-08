

import express from 'express';
import { criarGolpes } from '../controllers/golpeController.js';
import { buscarGolpes } from '../controllers/golpeController.js';
import { votarGolpes } from '../controllers/golpeController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas
router.post('/', verificarToken, criarGolpes);
router.get('/', buscarGolpes);
router.put('/:id', verificarToken, votarGolpes);


export default router;