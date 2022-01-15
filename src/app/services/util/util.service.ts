import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private toastrService: ToastrService,
  ) { }

  getJWT(): string | null {
    return localStorage.getItem('jwt');
  }

  setJWT(token: string) {
    localStorage.setItem('jwt', token);
  }

  showSuccess(message: string) {
    this.toastrService.success(message);
  }
}
