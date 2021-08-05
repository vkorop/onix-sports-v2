import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import UsersRepository from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  getAll() {
    return this.usersRepository.getAll();
  }

  getUser(id: ObjectId) {
    return this.usersRepository.getUser(id);
  }
}
