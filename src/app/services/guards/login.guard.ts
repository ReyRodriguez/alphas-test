import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // something like this  JSON.parse(localStorage.getItem('usuario'));
      const loggedIn = true
      if (loggedIn) {
        return true;
      } else {
        this.router.navigate(['app/home']);
        return false;
      }
  }

}
