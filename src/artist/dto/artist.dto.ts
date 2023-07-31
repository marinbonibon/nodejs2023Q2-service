import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class ArtistDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
