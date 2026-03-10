import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';
import { AppModule } from '../src/app.module';

let server;

async function bootstrap() {
  const expressApp = express();

  const app = await NestFactory.create(AppModule, expressApp);
  await app.init();

  return serverlessExpress({ app: expressApp });
}

export default async function handler(req, res) {
  if (!server) {
    server = await bootstrap();
  }
  return server(req, res);
}
