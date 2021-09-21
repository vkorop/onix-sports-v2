import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import UsersRepository from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  getAll(limit: number = 0, skip: number = 0) {
    return this.usersRepository.getAll(limit, skip);
  }

  getUser(id: ObjectId) {
    return this.usersRepository.getUser(id);
  }
}
