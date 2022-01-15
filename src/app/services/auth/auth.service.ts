import { HttpClient } from '@angular/common/http';
import { Injectable,  } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginUserDto, TokenDto } from 'src/app/dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  login(loginUserDto: LoginUserDto): Observable<TokenDto> {
    return this.httpClient.post(`${environment.authApiBaseUrl}/login`, loginUserDto).pipe(map((data: any) => data));
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }
}
