import { Controller, Get, HttpStatus, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '@pipes/objectId.pipe';
import { ObjectId } from 'mongodb';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('/')
  public getAll() {
    return this.usersService.getAll();
  }

  @ApiParam({ name: 'id', type: String })
  @Get('/:id')
  public getUser(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
  ) {
    return this.usersService.getUser(id);
  }
}
