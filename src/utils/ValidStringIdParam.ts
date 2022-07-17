import { IsNotEmpty, IsString } from 'class-validator';

export class ValidStringIdParam {
  @IsString()
  @IsNotEmpty()
  id: string;
}
