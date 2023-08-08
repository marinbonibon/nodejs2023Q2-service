import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { randomUUID } from 'crypto';
import Album from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(dto: AlbumDto): Promise<Album> {
    try {
      const newAlbum = new Album();
      newAlbum.id = randomUUID();
      newAlbum.name = dto.name;
      newAlbum.year = dto.year;
      newAlbum.artistId = dto.artistId;
      await this.albumRepository.save(newAlbum);
      return newAlbum;
    } catch (error) {
      console.log('error', error);
    }
  }

  async update(id: string, dto: AlbumDto): Promise<Album> {
    try {
      const albumToUpdate = await this.albumRepository.findOneBy({
        id,
      });
      albumToUpdate.name = dto.name;
      albumToUpdate.artistId = dto.artistId;
      albumToUpdate.year = dto.year;
      await this.albumRepository.save(albumToUpdate);
      return albumToUpdate;
    } catch (error) {
      console.log('error', error);
    }
  }

  async findAll(): Promise<Album[]> {
    try {
      return this.albumRepository.find();
    } catch (error) {
      console.log('error', error);
    }
  }

  async findOne(id: string): Promise<Album> {
    try {
      return await this.albumRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async remove(album: Album): Promise<void> {
    try {
      await this.albumRepository.remove(album);
      // this.tracks.forEach((track: Track) => {
      //   if (track.albumId === album.id) {
      //     track.albumId = null;
      //   }
      // });
      // const favoriteAlbum = this.favoriteAlbums.find(
      //   (albumId: string) => albumId === album.id,
      // );
      // if (favoriteAlbum) {
      //   this.favoriteAlbums.splice(this.favoriteAlbums.indexOf(album.id), 1);
      // }
    } catch (error) {
      console.log('error', error);
    }
  }
}
