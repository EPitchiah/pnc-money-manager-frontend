import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ParentalControl } from '../parental-control.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  toggleHelp: boolean = false;

  constructor(private router: Router, private authService: AuthService, private parentService: ParentalControl) {
    this.authService.logout();
  } // Inject Router

  onSubmit() {
    // Perform authentication logic here
    if (this.username === 'child' && this.password === 'tdp14') {
      console.log('Login successful, ' + this.username);
      this.authService.setUsername(this.username);
      this.authService.setPassword(this.password);
      // Redirect to accounts page
      this.router.navigate(['/accounts']); // Navigate to the accounts page

    }
    else if (this.username === 'parent' && this.password === 'tdp14') {
      console.log('Login successful, ' + this.username);
      this.authService.setUsername(this.username);
      this.authService.setPassword(this.password);
      // Redirect to accounts page
      this.router.navigate(['/home']); // Navigate to the accounts page
    }
    else {
      window.alert('Invalid username or password');
      this.username = '';
      this.password = '';
    }
  }
}
