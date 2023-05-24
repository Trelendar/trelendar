import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './error/custom';
import * as io from 'socket.io';
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
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
