import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './database/db.provider';
import { BoardModule } from './board/board.module';

@Module({
  imports: [UserModule, DbModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
