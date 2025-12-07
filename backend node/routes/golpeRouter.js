// routes/golpes.js

import express from 'express';
import { criarGolpes } from '../controllers/golpeController.js';
import { buscarGolpes } from '../controllers/golpeController.js';
import { votarGolpes } from '../controllers/golpeController.js';

const router = express.Router();

// Rotas
router.post('/', criarGolpes);
router.get('/', buscarGolpes);
router.put('/:id', votarGolpes)


export default router;