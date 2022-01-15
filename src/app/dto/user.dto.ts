import { UserStatus } from "../enums";

export interface UserDto {
  id: string;
  name: string;
  login: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  birthDate: string;
  motherName: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}
