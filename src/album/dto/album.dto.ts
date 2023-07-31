import { Allow, IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AlbumDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @Allow()
  artistId: string | null;
}
