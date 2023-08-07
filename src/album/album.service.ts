import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../db/database';
import { AlbumDto } from './dto/album.dto';
import { randomUUID } from 'crypto';
import { Album } from './types/album';
import { Track } from '../track/types/track';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = db.album;
  private readonly tracks: Track[] = db.track;
  private readonly favoriteAlbums: string[] = db.favorites.albums;

  async create(dto: AlbumDto): Promise<Album> {
    try {
      return new Promise((res) => {
        const album: Album = {
          id: randomUUID(),
          ...dto,
        };
        this.albums.push(album);
        res(album);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(
    id: string,
    album: Album,
    { name, artistId, year }: AlbumDto,
  ): Promise<Album> {
    try {
      return new Promise(async (res) => {
        album.name = name;
        album.artistId = artistId;
        album.year = year;
        res(album);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async findAll(): Promise<Album[]> {
    try {
      return this.albums;
    } catch (error) {
      console.log('error', error);
    }
  }

  async findOne(id: string): Promise<Album> {
    try {
      return this.albums.find((album: Album) => id === album.id);
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(album: Album): Promise<void> {
    try {
      this.albums.splice(this.albums.indexOf(album), 1);
      this.tracks.forEach((track: Track) => {
        if (track.albumId === album.id) {
          track.albumId = null;
        }
      });
      const favoriteAlbum = this.favoriteAlbums.find(
        (albumId: string) => albumId === album.id,
      );
      if (favoriteAlbum) {
        this.favoriteAlbums.splice(this.favoriteAlbums.indexOf(album.id), 1);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  throwNotFoundException(album: Album, id: string): void {
    if (album) {
      return;
    }
    throw new NotFoundException(`Album with ID ${id} not found`);
  }
}
