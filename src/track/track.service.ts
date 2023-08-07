import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../db/database';
import { Track } from './types/track';
import { randomUUID } from 'crypto';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = db.track;
  private readonly favoriteTracks: string[] = db.favorites.tracks;

  async create(dto: TrackDto): Promise<Track> {
    try {
      return new Promise((res) => {
        const track: Track = {
          id: randomUUID(),
          ...dto,
        };
        this.tracks.push(track);
        res(track);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(
    id: string,
    track: Track,
    { name, artistId, albumId, duration }: TrackDto,
  ): Promise<Track> {
    try {
      return new Promise(async (res) => {
        track.name = name;
        track.artistId = artistId;
        track.albumId = albumId;
        track.duration = duration;
        res(track);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async findAll(): Promise<Track[]> {
    try {
      return this.tracks;
    } catch (error) {
      console.log('error', error);
    }
  }

  async findOne(id: string): Promise<Track> {
    try {
      return this.tracks.find((track: Track) => id === track.id);
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(track: Track): Promise<void> {
    try {
      this.tracks.splice(this.tracks.indexOf(track), 1);
      const favoriteTrack = this.favoriteTracks.find(
        (trackId: string) => trackId === track.id,
      );
      if (favoriteTrack) {
        this.favoriteTracks.splice(this.favoriteTracks.indexOf(track.id), 1);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  throwNotFoundException(track: Track, id: string): void {
    if (track) {
      return;
    }
    throw new NotFoundException(`Track with ID ${id} not found`);
  }
}
