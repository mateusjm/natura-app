import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';
import { AppModule } from '../src/app.module';

let server: any;

async function bootstrap() {
  // Cria apenas o Nest normalmente
  const app = await NestFactory.create(AppModule);

  // Configura CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Inicializa o Nest (não chama app.listen)
  await app.init();

  // Cria a instância Express e conecta com serverless
  const expressApp = express();
  expressApp.use(app.getHttpAdapter().getInstance());

  return serverlessExpress({ app: expressApp });
}

export default async function handler(req: any, res: any) {
  if (!server) {
    server = await bootstrap();
  }
  return server(req, res);
}
