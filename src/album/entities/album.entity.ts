import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Track from '../../track/entities/track.entity';

@Entity()
class Album {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public year: number;

  @Column({ nullable: true })
  public artistId: string | null;

  @OneToMany(() => Track, (track) => track.album)
  tracks?: Track[];
}

export default Album;
