import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../db/database';
import { randomUUID } from 'crypto';
import { Artist } from './types/artist';
import { ArtistDto } from './dto/artist.dto';
import { Track } from '../track/types/track';
import { Album } from '../album/types/album';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = db.artist;
  private readonly tracks: Track[] = db.track;
  private readonly albums: Album[] = db.album;
  private readonly favoriteArtists: string[] = db.favorites.artists;

  async create(dto: ArtistDto): Promise<Artist> {
    try {
      return new Promise((res) => {
        const newArtist: Artist = {
          id: randomUUID(),
          ...dto,
        };
        this.artists.push(newArtist);
        res(newArtist);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(
    id: string,
    artist: Artist,
    { name, grammy }: ArtistDto,
  ): Promise<Artist> {
    try {
      return new Promise(async (res) => {
        artist.name = name;
        artist.grammy = grammy;
        res(artist);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async findAll(): Promise<Artist[]> {
    try {
      return this.artists;
    } catch (error) {
      console.log('error', error);
    }
  }

  async findOne(id: string): Promise<Artist> {
    try {
      return this.artists.find((artist: Artist) => id === artist.id);
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(artist: Artist): Promise<void> {
    try {
      this.artists.splice(this.artists.indexOf(artist), 1);
      this.tracks.forEach((track: Track) => {
        if (track.artistId === artist.id) {
          track.artistId = null;
        }
      });
      this.albums.forEach((album: Album) => {
        if (album.artistId === artist.id) {
          album.artistId = null;
        }
      });
      const favoriteArtist = this.favoriteArtists.find(
        (artistId: string) => artistId === artist.id,
      );
      if (favoriteArtist) {
        this.favoriteArtists.splice(this.favoriteArtists.indexOf(artist.id), 1);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  throwNotFoundException(artist: Artist, id: string): void {
    if (artist) {
      return;
    }
    throw new NotFoundException(`Artist with ID ${id} not found`);
  }
}
