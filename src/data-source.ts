import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AlbumCreating1691413282560 } from './album/migrations/1691413282560-albumCreating';
import User from './user/entities/user.entity';
import Album from './album/entities/album.entity';
import * as dotenv from 'dotenv';
import { ArtistCreating1691523825172 } from './artist/migrations/1691523825172-artistCreating';

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
  entities: [User, Album],
  migrations: [AlbumCreating1691413282560, ArtistCreating1691523825172],
  subscribers: [],
});
