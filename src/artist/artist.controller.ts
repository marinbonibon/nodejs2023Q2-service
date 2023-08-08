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
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import Artist from './entities/artist.entity';
import { ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Post()
  @UsePipes(new ValidationPipe({}))
  async create(@Body() createArtistDto: ArtistDto): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  @UsePipes(new ValidationPipe({}))
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: ArtistDto,
  ): Promise<Artist> {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist was not found.');
    }
    return this.artistService.update(id, updateArtistDto);
  }

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist was not found.');
    }
    return artist;
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist was not found.');
    }
    await this.artistService.remove(artist);
  }
}
