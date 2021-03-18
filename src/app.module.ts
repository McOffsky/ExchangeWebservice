import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ExchangeService } from './exchange.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [ExchangeService],
})
export class AppModule {}
