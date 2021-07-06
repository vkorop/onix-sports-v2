import { UserEntity } from '@components/users/schemas/user.schema';
import userConstants from '@components/users/user-constants';
import UsersRepository from '@components/users/users.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import SignUpDto from './dto/sign-up.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) {}

    createUser(user: SignUpDto) {
        return this.usersRepository.create(user);
    }
}
