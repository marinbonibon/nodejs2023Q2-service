import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserWithoutPassword } from './types/user';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    try {
      const newUser = new User();
      newUser.id = randomUUID();
      newUser.login = createUserDto.login;
      newUser.password = createUserDto.password;
      newUser.version = 1;
      newUser.createdAt = new Date();
      newUser.updatedAt = new Date();
      await this.userRepository.save(newUser);
      return {
        id: newUser.id,
        login: newUser.login,
        version: newUser.version,
        createdAt: newUser.createdAt.getTime(),
        updatedAt: newUser.updatedAt.getTime(),
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserWithoutPassword> {
    try {
      const userToUpdate = await this.userRepository.findOneBy({
        id,
      });
      if (userToUpdate.password !== dto.oldPassword) {
        throw new ForbiddenException(`Old password is incorrect`);
      }
      userToUpdate.password = dto.newPassword;
      userToUpdate.version += 1;
      userToUpdate.updatedAt = new Date();
      await this.userRepository.save(userToUpdate);
      return {
        id: userToUpdate.id,
        login: userToUpdate.login,
        version: userToUpdate.version,
        createdAt: userToUpdate.createdAt.getTime(),
        updatedAt: userToUpdate.updatedAt.getTime(),
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.log('error', error);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(user: User): Promise<void> {
    try {
      await this.userRepository.remove(user);
    } catch (error) {
      console.log('error', error);
    }
  }
}
