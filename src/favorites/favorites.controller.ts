import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Artist } from '../artist/types/artist';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './types/favorites-response';
import { Track } from '../track/types/track';
import { Album } from '../album/types/album';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private albumService: AlbumService,
    private trackService: TrackService,
    private artistService: ArtistService,
  ) {}

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    const tracks = await this.trackService.findAll();
    const artists = await this.artistService.findAll();
    const albums = await this.albumService.findAll();
    return this.favoritesService.findAll(tracks, artists, albums);
  }

  @Post('track/:id')
  @UsePipes(new ValidationPipe({}))
  async addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with ID ${id} does not exist`,
      );
    }
    await this.favoritesService.addFavTrack(id);
    return track;
  }

  @Post('artist/:id')
  @UsePipes(new ValidationPipe({}))
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with ID ${id} does not exist`,
      );
    }
    await this.favoritesService.addFavArtist(id);
    return artist;
  }

  @Post('album/:id')
  @UsePipes(new ValidationPipe({}))
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException(
        `Album with ID ${id} does not exist`,
      );
    }
    await this.favoritesService.addFavAlbum(id);
    return album;
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const track = await this.favoritesService.findFavTrack(id);
    if (!track) {
      throw new NotFoundException(`Favorite track with ID ${id} not found`);
    }
    await this.favoritesService.removeFavTrack(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const artist = await this.favoritesService.findFavArtist(id);
    if (!artist) {
      throw new NotFoundException(`Favorite artist with ID ${id} not found`);
    }
    await this.favoritesService.removeFavArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const album = await this.favoritesService.findFavAlbum(id);
    if (!album) {
      throw new NotFoundException(`Favorite album with ID ${id} not found`);
    }
    await this.favoritesService.removeFavAlbum(id);
  }
}
