import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_URL as string, {
      // automatically try to reconnect when it loses connection
      autoReconnect: true,
      useCreateIndex: true,
      // reconnect every reconnectInterval milliseconds
      // for reconnectTries times
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      // flag to allow users to fall back to the old
      // parser if they find a bug in the new parse
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
