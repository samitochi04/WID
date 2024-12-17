import express from 'express';
import todoRoutes from './routes/todoRoute';

const app = express();

app.use(express.json()); // Middleware pour analyser le JSON dans les requêtes
app.use('/api', todoRoutes); // Routes pour les todos

export default app;
