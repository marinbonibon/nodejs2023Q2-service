import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Artist } from '../artist/types/artist';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './types/favorites-response';
import { Track } from '../track/types/track';
import { Album } from '../album/types/album';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @UsePipes(new ValidationPipe({}))
  async addTrack(@Param('id') id: string): Promise<Track> {
    this.favoritesService.throwBadRequestException(id);
    return this.favoritesService.addFavTrack(id);
  }

  @Post('artist/:id')
  @UsePipes(new ValidationPipe({}))
  async addArtist(@Param('id') id: string): Promise<Artist> {
    this.favoritesService.throwBadRequestException(id);
    return this.favoritesService.addFavArtist(id);
  }

  @Post('album/:id')
  @UsePipes(new ValidationPipe({}))
  async addAlbum(@Param('id') id: string): Promise<Album> {
    this.favoritesService.throwBadRequestException(id);
    return this.favoritesService.addFavAlbum(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id') id: string): Promise<void> {
    this.favoritesService.throwBadRequestException(id);
    return this.favoritesService.removeFavTrack(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id') id: string): Promise<void> {
    this.favoritesService.throwBadRequestException(id);
    return this.favoritesService.removeFavArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id') id: string): Promise<void> {
    this.favoritesService.throwBadRequestException(id);
    return this.favoritesService.removeFavAlbum(id);
  }
}
