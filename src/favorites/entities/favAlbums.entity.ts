import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class FavAlbums {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
}

export default FavAlbums;
