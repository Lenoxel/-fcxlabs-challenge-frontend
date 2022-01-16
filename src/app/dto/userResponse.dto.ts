import { UserDto, UserSearchDto } from ".";

export interface UserResponseDto {
  data: UserDto[] | UserSearchDto[];
  count: number;
}
