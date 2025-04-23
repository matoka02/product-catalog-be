import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import productsRouter from './routes/productRoute';
import { corsOptions } from './utils/corsOptions';
import { mongooseConnect } from './utils/db';

dotenv.config();

export const app = express();

mongooseConnect();

app.use(cors(corsOptions)).use(express.json());
// app.use(cors({ origin: process.env.CLIENT_URL })).use(express.json());

app.get('/', async (_, resp) => {
  resp.status(200).send('Hello from Anastasiia');
});

app.use('/products', productsRouter);
