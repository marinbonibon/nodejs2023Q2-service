import { IsDefined, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsDefined()
  @IsString()
  public readonly oldPassword: string; // previous password

  @IsDefined()
  @IsString()
  public readonly newPassword: string; // new password
}
