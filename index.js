import express from 'express';
import infoRouter from './routes/logic.route';
import { getUsers } from './database/inmemory';

const app = express();

app.use('/api', infoRouter);
app.use('/api', getUsers);




const PORT = process.env.PORT ?? 3010
app.listen(PORT , () => {
    console.log(`access https://api.xeze.shop`);
});