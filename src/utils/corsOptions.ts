import { CorsCallback } from '../types/CorsCallback';

const whiteList = [
  'http://localhost:4000',
];

export const corsOptions = {
  origin: ''
  //   (origin: string, callback: CorsCallback) => {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
};
