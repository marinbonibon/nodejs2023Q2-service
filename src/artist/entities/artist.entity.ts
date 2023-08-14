import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Artist {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public grammy: boolean;
}

export default Artist;
