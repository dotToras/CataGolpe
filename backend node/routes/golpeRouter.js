// routes/golpes.js

import express from 'express';
import { criarGolpes } from '../controllers/golpeController.js';

const router = express.Router();


router.post('/', criarGolpes);



export default router;