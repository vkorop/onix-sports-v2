import { Document, Schema, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

import { RolesEnum } from '@decorators/roles.decorator';
import usersConstants from '../user-constants';

export class UserEntity extends Document {
  @ApiProperty({ type: String })
  readonly _id: Types.ObjectId = new ObjectId();

  @ApiProperty({ type: String })
  readonly name: string = '';

  @ApiProperty({ type: String })
  readonly email: string = '';

  @ApiProperty({ type: String })
  readonly password: string = '';

  @ApiProperty({ type: Boolean })
  readonly verified: boolean = true;

  @ApiProperty({ type: 'enum', enum: RolesEnum })
  readonly role: RolesEnum = RolesEnum.user;
}

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: true,
      required: true,
    },
    role: {
      type: RolesEnum,
      default: RolesEnum.user,
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
    collection: usersConstants.models.users,
  },
);
