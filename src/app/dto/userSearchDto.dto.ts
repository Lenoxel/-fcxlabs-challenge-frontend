import { AgeScale, UserStatus } from "../enums";

export interface UserSearchDto {
  id: number;
  name: string;
  login: string;
  cpf: string;
  status: UserStatus;
  ageScale: AgeScale;
  ageRange?: {
    start: number;
    end: number;
  };
  birthDate?: {
    start: Date;
    end: Date;
  };
  createdAt?: {
    start: Date;
    end: Date;
  };
  updatedAt?: {
    start: Date;
    end: Date;
  };
}
