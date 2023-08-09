import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class FavArtists {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
}

export default FavArtists;
