import express from 'express'
import golpesRoutes from './routes/golpeRouter.js';

const app = express();
app.use(express.json());

// Conecta as rotas
app.use('/api/golpes', golpesRoutes);

export default app;