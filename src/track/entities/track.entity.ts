import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Track;
