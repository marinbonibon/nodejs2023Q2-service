import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Album from '../../album/entities/album.entity';

@Entity()
class Track {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ nullable: true })
  public artistId: string | null;

  @Column({ nullable: true })
  public albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  public album?: Album;
}

export default Track;
