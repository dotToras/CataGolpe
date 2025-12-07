import express from 'express'
import golpesRoutes from './routes/golpeRouter.js';
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conecta as rotas
app.use('/api/golpes', golpesRoutes);

export default app;