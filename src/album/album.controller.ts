import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus, NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { AlbumService } from './album.service';
import Album from './entities/album.entity';
import { ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  async create(@Body() createAlbumDto: AlbumDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'Album was not found.' })
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: AlbumDto,
  ): Promise<Album> {
    const album = await this.albumService.findOne(id);
    if(!album) {
      throw new NotFoundException('Album was not found.');
    }
    return this.albumService.update(id,updateAlbumDto);
  }

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Album was not found.' })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    const album = await this.albumService.findOne(id);
    if(!album) {
      throw new NotFoundException('Album was not found.');
    }
    return album;
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Album was not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album was not found.');
    }
    await this.albumService.remove(album);
  }
}
