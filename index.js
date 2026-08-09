import express from 'express';
import infoRouter from './routes/logic.route';

const app = express();

app.use('/api', infoRouter);




const PORT = process.env.PORT ?? 3010
app.listen(PORT , () => {
    console.log(`access https://api.xeze.shop`);
});