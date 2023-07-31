import {
  Allow,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

export class TrackDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @Allow()
  artistId: string | null;

  @IsNotEmpty()
  @Allow()
  albumId: string | null;
}
