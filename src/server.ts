import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { mongooseConnect } from './utils/db';
import productsRouter from './routes/productRoute';
import { corsOptions } from './utils/corsOptions';

dotenv.config();

export const app = express();

mongooseConnect();

app.use(cors({ origin: process.env.CLIENT_URL })).use(express.json());
// app.use(cors(corsOptions)).use(express.json());

app.get('/', async (_, resp) => {
  resp.status(200).send('Hello from Anastasiia')
});

app.use('/products', productsRouter);

