import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserWithoutPassword } from './types/user';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiNotFoundResponse({ description: 'User was not found.' })
  @UsePipes(new ValidationPipe({}))
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    const newUser = await this.userService.create(createUserDto);
    if (!newUser) {
      throw new NotFoundException('User was not found.');
    }
    return newUser;
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'User was not found.' })
  @ApiForbiddenResponse({ description: 'Old password is incorrect.' })
  @UsePipes(new ValidationPipe({}))
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    const updatedUser = await this.userService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User was not found.');
    }
    return updatedUser;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'User was not found.' })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User was not found.');
    }
    return user;
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'User was not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User was not found.');
    }
    await this.userService.remove(user);
  }
}
