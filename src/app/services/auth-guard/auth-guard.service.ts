import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private utilService: UtilService) { }
    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('jwt')) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
}
