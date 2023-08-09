import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class FavTracks {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
}

export default FavTracks;
