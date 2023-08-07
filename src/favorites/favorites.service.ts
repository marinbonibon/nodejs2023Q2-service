import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Artist } from '../artist/types/artist';
import { Favorites } from './types/favorites';
import { db } from '../db/database';
import { FavoritesResponse } from './types/favorites-response';
import { Track } from '../track/types/track';
import { Album } from '../album/types/album';

@Injectable()
export class FavoritesService {
  private readonly favorites: Favorites = db.favorites;
  private readonly tracks: Track[] = db.track;
  private readonly artists: Artist[] = db.artist;
  private readonly albums: Album[] = db.album;

  async findAll(): Promise<FavoritesResponse> {
    try {
      const favoriteTracks = this.favorites.tracks.map((favTrackId: string) => {
        const track = this.tracks.find((track) => track.id === favTrackId);
        if (!track) return;
        return track;
      });
      const favoriteArtists = this.favorites.artists.map(
        (favArtistId: string) => {
          const artist = this.artists.find(
            (artist: Artist) => artist.id === favArtistId,
          );
          if (!artist) return;
          return artist;
        },
      );
      const favoriteAlbums = this.favorites.albums.map((favAlbumId: string) => {
        const album = this.albums.find(
          (album: Album) => album.id === favAlbumId,
        );
        if (!album) return;
        return album;
      });
      return {
        tracks: favoriteTracks,
        artists: favoriteArtists,
        albums: favoriteAlbums,
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  async addFavTrack(id: string): Promise<Track> {
    try {
      return new Promise((res) => {
        const track = this.tracks.find((track: Track) => track.id === id);
        if (!track) {
          throw new UnprocessableEntityException(
            `Track with ID ${id} does not exist`,
          );
        }
        this.favorites.tracks.push(id);
        res(track);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async removeFavTrack(id: string): Promise<void> {
    const track = this.tracks.find((track: Track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    this.favorites.tracks.splice(this.favorites.tracks.indexOf(track.id), 1);
  }

  async addFavArtist(id: string): Promise<Artist> {
    try {
      return new Promise((res) => {
        const artist = this.artists.find((artist: Artist) => artist.id === id);
        if (!artist) {
          throw new UnprocessableEntityException(
            `Artist with ID ${id} does not exist`,
          );
        }
        this.favorites.artists.push(id);
        res(artist);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async removeFavArtist(id: string): Promise<void> {
    const artist = this.artists.find((artist: Artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    this.favorites.artists.splice(this.favorites.artists.indexOf(artist.id), 1);
  }

  async addFavAlbum(id: string): Promise<Album> {
    try {
      return new Promise((res) => {
        const album = this.albums.find((album: Album) => album.id === id);
        if (!album) {
          throw new UnprocessableEntityException(
            `Album with ID ${id} does not exist`,
          );
        }
        this.favorites.albums.push(id);
        res(album);
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async removeFavAlbum(id: string): Promise<void> {
    const album = this.albums.find((album: Album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    this.favorites.albums.splice(this.favorites.albums.indexOf(album.id), 1);
  }
}
