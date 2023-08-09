import { Injectable } from '@nestjs/common';
import { FavoritesResponse } from './types/favorites-response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import FavArtists from './entities/favArtists.entity';
import FavAlbums from './entities/favAlbums.entity';
import FavTracks from './entities/favTracks.entity';
import Album from '../album/entities/album.entity';
import Track from '../track/entities/track.entity';
import Artist from '../artist/entities/artist.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavArtists)
    private favArtistRepository: Repository<FavArtists>,
    @InjectRepository(FavAlbums)
    private favAlbumRepository: Repository<FavAlbums>,
    @InjectRepository(FavTracks)
    private favTrackRepository: Repository<FavTracks>,
  ) {}

  async findAll(tracks, artists, albums): Promise<FavoritesResponse> {
    try {
      const favoriteTrackIds = await this.favTrackRepository.find();
      const favoriteArtistIds = await this.favArtistRepository.find();
      const favoriteAlbumIds = await this.favAlbumRepository.find();
      const favoriteTracks = favoriteTrackIds.map((id: FavTracks | string) => {
        return tracks.find((track: Track) => track.id === id);
      });
      const favoriteArtists = favoriteArtistIds.map(
        (id: FavArtists | string) => {
          return artists.find((artist: Artist) => artist.id === id);
        },
      );
      const favoriteAlbums = favoriteAlbumIds.map((id: FavAlbums | string) => {
        return albums.find((album: Album) => album.id === id);
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

  async addFavTrack(id: string): Promise<void> {
    try {
      await this.favTrackRepository.save({ id });
    } catch (error) {
      console.log('error', error);
    }
  }

  async findFavTrack(id: string): Promise<FavTracks> {
    try {
      return await this.favTrackRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async removeFavTrack(id: string): Promise<void> {
    await this.favAlbumRepository.remove({ id });
  }

  async findFavArtist(id: string): Promise<FavAlbums> {
    try {
      return await this.favArtistRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async addFavArtist(id: string): Promise<void> {
    try {
      await this.favArtistRepository.save({ id });
    } catch (error) {
      console.log('error', error);
    }
  }

  async removeFavArtist(id: string): Promise<void> {
    await this.favArtistRepository.remove({ id });
  }

  async findFavAlbum(id: string): Promise<FavAlbums> {
    try {
      return await this.favAlbumRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async addFavAlbum(id: string): Promise<void> {
    try {
      await this.favAlbumRepository.save({ id });
    } catch (error) {
      console.log('error', error);
    }
  }

  async removeFavAlbum(id: string): Promise<void> {
    await this.favAlbumRepository.remove({ id });
  }
}
