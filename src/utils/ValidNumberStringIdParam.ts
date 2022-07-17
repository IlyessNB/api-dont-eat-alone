import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ValidNumberStringIdParam {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}
