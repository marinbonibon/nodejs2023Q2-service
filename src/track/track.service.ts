import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TrackDto } from './dto/track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Track from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(dto: TrackDto): Promise<Track> {
    try {
      const newTrack: Track = {
        id: randomUUID(),
        ...dto,
      };
      await this.trackRepository.save(newTrack);
      return newTrack;
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(
    id: string,
    { name, artistId, albumId, duration }: TrackDto,
  ): Promise<Track> {
    try {
      const trackToUpdate = await this.trackRepository.findOneBy({
        id,
      });
      trackToUpdate.name = name;
      trackToUpdate.artistId = artistId;
      trackToUpdate.albumId = albumId;
      trackToUpdate.duration = duration;
      await this.trackRepository.save(trackToUpdate);
      return trackToUpdate;
    } catch (error) {
      console.log('error', error);
    }
  }

  async findAll(): Promise<Track[]> {
    try {
      return this.trackRepository.find();
    } catch (error) {
      console.log('error', error);
    }
  }

  async findOne(id: string): Promise<Track> {
    try {
      return await this.trackRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(track: Track): Promise<void> {
    try {
      await this.trackRepository.remove(track);
      // const favoriteTrack = this.favoriteTracks.find(
      //   (trackId: string) => trackId === track.id,
      // );
      // if (favoriteTrack) {
      //   this.favoriteTracks.splice(this.favoriteTracks.indexOf(track.id), 1);
      // }
    } catch (error) {
      console.log('error', error);
    }
  }
}
