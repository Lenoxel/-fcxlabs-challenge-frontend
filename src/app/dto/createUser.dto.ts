import { UserStatus } from '../enums/user-status.enum';

export interface CreateUserDto {
  name: string;
  login: string;
  password: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  birthDate: string;
  motherName: string;
  status: UserStatus;
}
