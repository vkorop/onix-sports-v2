import { UsersModule } from '@components/users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthController]
})
export class AuthModule {}
