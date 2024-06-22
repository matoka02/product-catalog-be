/* eslint-disable no-unused-vars */
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: string;
      CLIENT_URL: string;
    }
  }
}
