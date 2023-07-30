import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  User,
  UserWithoutPassword
} from '../types/user';
import { db } from '../../db/database';
import { isIdValid } from '../utils/uuidValidation';
import { isValidCreateUserDto } from '../utils/createUserDtoValidation';
import { isValidUpdateUserDto } from '../utils/updateUserDtoValidation';

@Injectable()
export class UserService {
  private readonly users: User[] = db.user;

  create(user: User): UserWithoutPassword {
    this.users.push(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  update(id: string, dto: UpdateUserDto): UserWithoutPassword {
    const user = this.findOne(id);
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException(`Old password is incorrect`);
    }
    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = new Date().getDate();
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    return this.users.find((user: User) => id === user.id);
  }

  remove(user: User): void {
    this.users.splice(this.users.indexOf(user), 1);
  }

  throwNotFoundException(user: User, id: string): void {
    if (user) {
      return;
    }
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  throwBadRequestException(id: string): void {
    const isValidId = id.match(isIdValid);
    if (isValidId) {
      return;
    }
    throw new BadRequestException(`ID ${id} is invalid`);
  }

  throwCreateBadRequest(dto: CreateUserDto): void {
    const { login, password } = dto;
    const isValidDto = isValidCreateUserDto(login, password);
    if (isValidDto) {
      return;
    }
    throw new BadRequestException(`Login or password is invalid`);
  }

  throwUpdateBadRequest(dto: UpdateUserDto): void {
    const { oldPassword, newPassword } = dto;
    const isValidDto = isValidUpdateUserDto(oldPassword, newPassword);
    if (isValidDto) {
      return;
    }
    throw new BadRequestException(`Old password and new password are required`);
  }
}
