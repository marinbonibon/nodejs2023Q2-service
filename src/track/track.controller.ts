import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UsePipes, ValidationPipe
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './types/track';
import { TrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  async create(@Body() createTrackDto: TrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ skipNullProperties: true }))
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: TrackDto,
  ): Promise<Track> {
    const track = await this.trackService.findOne(id);
    this.trackService.throwBadRequestException(id);
    this.trackService.throwNotFoundException(track, id);
    return this.trackService.update(id, track, updateTrackDto);
  }

  @Get()
  async findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Track> {
    this.trackService.throwBadRequestException(id);
    const track = await this.trackService.findOne(id);
    this.trackService.throwNotFoundException(track, id);
    return track;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    this.trackService.throwBadRequestException(id);
    const track = await this.trackService.findOne(id);
    this.trackService.throwNotFoundException(track, id);
    await this.trackService.remove(track);
  }
}
