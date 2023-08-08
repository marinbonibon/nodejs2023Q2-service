import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ArtistDto } from './dto/artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Artist from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
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

  async update(
    id: string,
    { name, grammy }: ArtistDto,
  ): Promise<Artist> {
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
      await this.artistRepository.remove(artist);
      // this.tracks.forEach((track: Track) => {
      //   if (track.artistId === artist.id) {
      //     track.artistId = null;
      //   }
      // });
      // this.albums.forEach((album: Album) => {
      //   if (album.artistId === artist.id) {
      //     album.artistId = null;
      //   }
      // });
      // const favoriteArtist = this.favoriteArtists.find(
      //   (artistId: string) => artistId === artist.id,
      // );
      // if (favoriteArtist) {
      //   this.favoriteArtists.splice(this.favoriteArtists.indexOf(artist.id), 1);
      // }
    } catch (error) {
      console.log('error', error);
    }
  }
}
