import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
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

  getAll(limit: number, skip: number) {
    return this.userModel.find({}, { password: 0 }).skip(limit).limit(limit);
  }

  getUser(id: ObjectId) {
    return this.userModel.findById(id, { password: 0 });
  }
}
