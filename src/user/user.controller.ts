import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  User,
  UserWithoutPassword
} from '../types/user';
import { randomUUID } from 'crypto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserWithoutPassword {
    this.userService.throwCreateBadRequest(createUserDto);
    const user = {
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    };
    return this.userService.create(user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): UserWithoutPassword {
    const user = this.userService.findOne(id);
    this.userService.throwBadRequestException(id);
    this.userService.throwUpdateBadRequest(updateUserDto);
    this.userService.throwNotFoundException(user, id);
    return this.userService.update(id, updateUserDto);
  }

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    const user = this.userService.findOne(id);
    this.userService.throwBadRequestException(id);
    this.userService.throwNotFoundException(user, id);
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    const user = this.userService.findOne(id);
    this.userService.throwBadRequestException(id);
    this.userService.throwNotFoundException(user, id);
    this.userService.remove(user);
  }
}
