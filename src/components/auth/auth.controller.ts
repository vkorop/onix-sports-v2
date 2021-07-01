import { UsersService } from '@components/users/users.service';
import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post('sign-up')
  public async signup() {
  }
}
