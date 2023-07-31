import { IsDefined, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  public readonly login: string;

  @IsDefined()
  @IsString()
  public readonly password: string;
}
