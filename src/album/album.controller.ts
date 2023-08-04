import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { Album } from './types/album';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  async create(@Body() createAlbumDto: AlbumDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: AlbumDto,
  ): Promise<Album> {
    const album = await this.albumService.findOne(id);
    this.albumService.throwNotFoundException(album, id);
    return this.albumService.update(id, album, updateAlbumDto);
  }

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    const album = await this.albumService.findOne(id);
    this.albumService.throwNotFoundException(album, id);
    return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const album = await this.albumService.findOne(id);
    this.albumService.throwNotFoundException(album, id);
    await this.albumService.remove(album);
  }
}
