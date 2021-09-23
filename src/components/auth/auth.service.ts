import UsersRepository from '@components/users/users.repository';
import { Injectable } from '@nestjs/common';
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
