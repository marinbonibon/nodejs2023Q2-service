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
import { ArtistService } from './artist.service';
import { Artist } from './types/artist';
import { ArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Post()
  @UsePipes(new ValidationPipe({}))
  async create(@Body() createArtistDto: ArtistDto): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({}))
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: ArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistService.findOne(id);
    this.artistService.throwNotFoundException(artist, id);
    return this.artistService.update(id, artist, updateArtistDto);
  }

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    const artist = await this.artistService.findOne(id);
    this.artistService.throwNotFoundException(artist, id);
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const artist = await this.artistService.findOne(id);
    this.artistService.throwNotFoundException(artist, id);
    await this.artistService.remove(artist);
  }
}
