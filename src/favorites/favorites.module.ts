import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import FavAlbums from './entities/favAlbums.entity';
import FavArtists from './entities/favArtists.entity';
import FavTracks from './entities/favTracks.entity';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavAlbums, FavArtists, FavTracks]),
    AlbumModule,
    ArtistModule,
    TrackModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
