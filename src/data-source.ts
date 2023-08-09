import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AlbumCreating1691413282560 } from './album/migrations/1691413282560-albumCreating';
import User from './user/entities/user.entity';
import Album from './album/entities/album.entity';
import Track from './track/entities/track.entity';
import * as dotenv from 'dotenv';
import { ArtistCreating1691523825172 } from './artist/migrations/1691523825172-artistCreating';
import { TrackCreating1691529256363 } from './track/migrations/1691529256363-trackCreating';
import { FavArtistsCreating1691577823664 } from './favorites/migrations/1691577823664-favArtistsCreating';
import { FavAlbumsCreating1691577830642 } from './favorites/migrations/1691577830642-favAlbumsCreating';
import { FavTracksCreating1691577838782 } from './favorites/migrations/1691577838782-favTracksCreating';
import FavAlbums from './favorites/entities/favAlbums.entity';
import FavArtists from './favorites/entities/favArtists.entity';
import FavTracks from './favorites/entities/favTracks.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [User, Album, Track, FavAlbums, FavArtists, FavTracks],
  migrations: [
    AlbumCreating1691413282560,
    ArtistCreating1691523825172,
    TrackCreating1691529256363,
    FavArtistsCreating1691577823664,
    FavAlbumsCreating1691577830642,
    FavTracksCreating1691577838782,
  ],
  subscribers: [],
});
