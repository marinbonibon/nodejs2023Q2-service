import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, UserWithoutPassword } from './types/user';
import { db } from '../../db/database';
import { isIdValid } from '../utils/uuidValidation';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly users: User[] = db.user;

  create(user: User): Promise<UserWithoutPassword> {
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

  update(id: string, dto: UpdateUserDto): Promise<UserWithoutPassword> {
   try {
     return new Promise((res) => {
       const user = this.findOne(id);
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

  findAll(): User[] {
    try {
      return this.users;
    } catch (error) {
      console.log('error', error);
    }
  }

  findOne(id: string): User {
    try {
      return this.users.find((user: User) => id === user.id);
    } catch (error) {
      console.log('error', error);
    }
  }

  remove(user: User): void {
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

  throwBadRequestException(id: string): void {
    const isValidId = id.match(isIdValid);
    if (isValidId) {
      return;
    }
    throw new BadRequestException(`ID ${id} is invalid`);
  }
}
