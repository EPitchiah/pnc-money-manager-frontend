import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    //Checks role (currently username)
    const expectedRole = route.data['expectedRole'];
    if (this.auth.getUsername() == expectedRole) {
      return true; // User is authenticated
    } else {
      this.auth.logout();
      this.router.navigate(['']); // Redirect to login page
      console.log("Invalid Role");
      return false;
    }
  }

}
