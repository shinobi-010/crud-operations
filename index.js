import express from 'express';
import { errorHandler } from './middlewares/error.middleware';
import 'dotenv/config';
import infoRouter from './routes/logic.route';
import { getUsers } from './database/inmemory';
import './database/postgres';

const app = express();
app.use(express.json());
app.use('/api', infoRouter);
app.use(errorHandler);



const PORT = process.env.PORT ?? 3010
app.listen(PORT , () => {
    console.log(`access https://api.xeze.shop`);
});