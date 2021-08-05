import { Controller, Get, HttpStatus, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '@pipes/objectId.pipe';
import { ObjectId } from 'mongodb';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('/all')
  public getAll() {
    return this.usersService.getAll();
  }

  @Get('/get-one')
  public getUser(
    @Query('id') id: string,
  ) {
    return this.usersService.getUser(new ObjectId(id));
  }
}
