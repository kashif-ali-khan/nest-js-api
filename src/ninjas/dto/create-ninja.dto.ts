import { MinLength } from 'class-validator';

export class CreateNinjaDto {
  id: number;

  @MinLength(2)
  name: string;

  age: number;
  skill: string;
}
