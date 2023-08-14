import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ArtistDto } from './dto/artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Artist from './entities/artist.entity';
import Track from '../track/entities/track.entity';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';
import { AlbumService } from '../album/album.service';
import Album from '../album/entities/album.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    private trackService: TrackService,
    private albumService: AlbumService,
    private favoritesService: FavoritesService,
  ) {}

  async create(dto: ArtistDto): Promise<Artist> {
    try {
      const newArtist: Artist = {
        id: randomUUID(),
        ...dto,
      };
      await this.artistRepository.save(newArtist);
      return newArtist;
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(id: string, { name, grammy }: ArtistDto): Promise<Artist> {
    try {
      const artistToUpdate = await this.artistRepository.findOneBy({
        id,
      });
      artistToUpdate.name = name;
      artistToUpdate.grammy = grammy;
      await this.artistRepository.save(artistToUpdate);
      return artistToUpdate;
    } catch (error) {
      console.log('error', error);
    }
  }

  async findAll(): Promise<Artist[]> {
    try {
      return this.artistRepository.find();
    } catch (error) {
      console.log('error', error);
    }
  }

  async findOne(id: string): Promise<Artist> {
    try {
      return await this.artistRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(artist: Artist): Promise<void> {
    try {
      const tracks = await this.trackService.findAll();
      tracks.forEach((track: Track) => {
        if (track.artistId === artist.id) {
          track.artistId = null;
          this.trackService.update(track.id, track);
        }
      });

      const albums = await this.albumService.findAll();
      albums.forEach((album: Album) => {
        if (album.artistId === artist.id) {
          album.artistId = null;
          this.albumService.update(album.id, album);
        }
      });

      const favoriteArtist = await this.favoritesService.findFavArtist(
        artist.id,
      );
      if (favoriteArtist) {
        await this.favoritesService.removeFavArtist(favoriteArtist.id);
      }

      await this.artistRepository.remove(artist);
    } catch (error) {
      console.log('error', error);
    }
  }
}
