import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.getUsername() != '') {
      return true; // User is authenticated
    } else {
      this.auth.logout();
      this.router.navigate(['']); // Redirect to login page
      return false;
    }
  }
}
