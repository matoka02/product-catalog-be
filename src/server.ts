import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongooseConnect } from './utils/db';

dotenv.config();

mongooseConnect();

export const app = express();

app.use(cors({ origin: process.env.CLIENT_URL })).use(express.json());

app.get('/', async (_, responce)=>{
  await mongooseConnect();
  responce.status(200).send('Hello from Matoka')
})
