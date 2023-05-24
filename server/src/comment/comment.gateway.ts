import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Comment } from './entities/comment.entity';

@WebSocketGateway(8080, { allowEIO3: true, transports: ['websocket'] })
export class CommentsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('joinRoom')
  handleMessage(client: Socket, payload: { cardId: string }): void {
    client.join(`card-${payload.cardId}`);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('msgToClient', 'payload');
  }

  // Handle new comments and emit them to the appropriate client
  async handleNewComment(comment: Comment, cardId: string) {
    this.server.to(`card-${cardId}`).emit('newComment', comment);
  }
  async handleDeleteComment(idDeleted: string, cardId: string) {
    this.server.to(`card-${cardId}`).emit('deleteComment', idDeleted);
  }
}
