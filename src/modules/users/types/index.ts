import { Exclude } from 'class-transformer';

export interface Users {
  username: string;
  id: number;
  password: string;
}

export class SerializedUsers {
  username: string;
  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUsers>) {
    Object.assign(this, partial);
  }
}
