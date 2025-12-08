import express from 'express'
import golpesRoutes from './routes/golpeRouter.js';
import usuarioRoutes from './routes/usuarioRouter.js';
import cors from "cors";
import jwt from  "jsonwebtoken";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conecta as rotas
app.use('/api/golpes', golpesRoutes);
app.use('/api/usuario', usuarioRoutes);

export default app;