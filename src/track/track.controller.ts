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
import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';
import Track from './entities/track.entity';
import { ApiNotFoundResponse } from '@nestjs/swagger';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  async create(@Body() createTrackDto: TrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: TrackDto,
  ): Promise<Track> {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track was not found.');
    }
    return this.trackService.update(id, updateTrackDto);
  }

  @Get()
  async findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track was not found.');
    }
    return track;
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track was not found.');
    }
    await this.trackService.remove(track);
  }
}
