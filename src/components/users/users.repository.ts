import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId, ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';
import userConstants from './user-constants';
import { UserEntity } from './schemas/user.schema';
import SignUpDto from '@components/auth/dto/sign-up.dto';


@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel(userConstants.models.users) 
    private readonly userModel: Model<UserEntity>
  ) {}

  create(user: SignUpDto) {
    return this.userModel.create(user);
  }
}
