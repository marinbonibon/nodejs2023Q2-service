import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserWithoutPassword } from './types/user';
import { db } from '../../db/database';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly users: User[] = db.user;

  async create(user: User): Promise<UserWithoutPassword> {
    try {
      return new Promise((res) => {
        this.users.push(user);
        const { password, ...userWithoutPassword } = user;
        res(userWithoutPassword);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(
    id: string,
    user: User,
    dto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    try {
      return new Promise((res) => {
        if (user.password !== dto.oldPassword) {
          throw new ForbiddenException(`Old password is incorrect`);
        }
        user.password = dto.newPassword;
        user.version += 1;
        user.updatedAt = new Date().getDate();
        const { password, ...userWithoutPassword } = user;
        res(userWithoutPassword);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.users;
    } catch (error) {
      console.log('error', error);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return this.users.find((user: User) => id === user.id);
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(user: User): Promise<void> {
    try {
      this.users.splice(this.users.indexOf(user), 1);
    } catch (error) {
      console.log('error', error);
    }
  }

  throwNotFoundException(user: User, id: string): void {
    if (user) {
      return;
    }
    throw new NotFoundException(`User with ID ${id} not found`);
  }
}
