import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './error/custom';
import { WsAdapter } from '@nestjs/platform-ws';
import * as http from 'http';
import { createServer } from 'http';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as io from 'socket.io';
import { Server } from 'socket.io';
import { CommentsGateway } from './comment/comment.gateway';
import * as WebSocket from 'ws';
import { ServerOptions } from 'ws';

export class RailwayIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    console.log(
      '🚀 ~ file: main.ts:16 ~ RailwayIoAdapter ~ createIOServer ~ port:',
      port,
    );
    const server = super.createIOServer(port, options);
    // const server = new WebSocket.Server({ port });
    // server.engine.ws = new WebSocket(options);
    return server;
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
  // const server = app.getHttpServer();
  // const ioServer = new io.Server(server, {
  //   allowEIO3: true, // <-- Set the allowEIO3 option to true
  // });
  // ioServer.on('connection', (socket) => {
  //   console.log('Client connected');
  //   socket.emit('message', 'Hello, world!');
  // });
  // const server = createServer(app.getHttpAdapter().getInstance());
  // const ioAdapter = new IoAdapter(server);
  // app.useWebSocketAdapter(ioAdapter);
  // app.useWebSocketAdapter(new WsAdapter(app));
  app.useWebSocketAdapter(new RailwayIoAdapter());
  // await app.listen(process.env.PORT || 3001);
  // console.log(`Applicationis running on: ${await app.getUrl()}`);
  // app.useWebSocketAdapter(new IoAdapter(io));
  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
