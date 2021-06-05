import { SetMetadata } from '@nestjs/common';

// eslint-disable-next-line no-shadow
export enum RolesEnum {
  admin = 'admin',
  user = 'user'
}

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
