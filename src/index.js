import express from 'express';
import employeesRoutes from './routes/employees.js';
import indexRoutes from './routes/index.js';
import { PORT } from './config.js';

const app = express();

const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found',
    });
};

app.use(express.json());
app.use('/api', employeesRoutes);
app.use(indexRoutes);
 app.use(notFoundMiddleware);

app.listen(PORT);

console.log('Server running on port', PORT);
