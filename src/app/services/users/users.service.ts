import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto, RecoverPasswordDto, UpdateUserDto, UserChangeResultDto, UserDto, UserResponseDto, UserSearchDto } from 'src/app/dto';
import { UserStatus } from 'src/app/enums';
import { Page } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  // Serviço que retorna todos os usuários
  getUsers(): Observable<UserResponseDto> {
    return this.httpClient.get(`${environment.usersApiBaseUrl}`).pipe(map((data: any) => data));
  }

  // Serviço que retorna os usuários de forma paginada, possibilitando inserir filtros na busca
  getUsersByFilters({ pageNumber, size }: Page, userSearchDto?: UserSearchDto): Observable<UserResponseDto> {
    const params = new HttpParams().appendAll({
      first: pageNumber * size,
      size,
    });

    return this.httpClient.post(`${environment.usersApiBaseUrl}/byFilters`, userSearchDto || null, { params }).pipe(map((data: any) => data));
  }

  // Serviço que retorna um usuário pelo seu id
  getUserById(id: string): Observable<UserDto> {
    return this.httpClient.get(`${environment.usersApiBaseUrl}/${id}`).pipe(map((data: any) => data));
  }

  // Serviço de criação de um usuário
  createUser(createUserDto: CreateUserDto): Observable<UserDto> {
    return this.httpClient.post(`${environment.usersApiBaseUrl}/`, createUserDto).pipe(map((data: any) => data));
  }

  // Serviço de atualização de um usuário
  updateUser(id: string, updateUserDto: UpdateUserDto): Observable<UserDto> {
    return this.httpClient.put(`${environment.usersApiBaseUrl}/${id}`, updateUserDto).pipe(map((data: any) => data));
  }

  // Serviço que permite a um usuário recuperar o seu acesso alterando a senha
  recoverPassword(recoverPassword: RecoverPasswordDto): Observable<void> {
    return this.httpClient.put(`${environment.usersApiBaseUrl}/password/recover`, recoverPassword).pipe(map((data: any) => data));
  }

  // Serviço que altera o status de um usuário
  changeUserStatus(id: string, status: UserStatus): Observable<UserChangeResultDto> {
    return this.httpClient.put(`${environment.usersApiBaseUrl}/${id}/status`, { status }).pipe(map((data: any) => data));
  }

  inactiveUserBulk(): Observable<void> {
    return this.httpClient.delete(`${environment.usersApiBaseUrl}/inactive`).pipe(map((data: any) => data));
  }
}
