import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tdp-hackathon';
  username: string;
  menu: boolean = false;
  
  constructor(private router: Router, private authService: AuthService) {
    this.username = this.authService.getUsername();
  }

  ngOnInit(): void {
    // Subscribe to router events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Update username when navigation ends
      this.username = this.authService.getUsername();
    });
  }


    navigateToLogin() {
      this.router.navigate(['/']);
      this.authService.setUsername('');
    }
    
    navigateToHome() {
      if(this.username === 'parent')
        this.navigateToDashboard();
      else if(this.username === 'child')
        this.navigateToAccounts();
      else
        this.navigateToLogin();
    }
    navigateToDashboard() {
      this.router.navigate(['/home']);
    }
    navigateToLeaderboard() {
      this.router.navigate(['/leaderboard']);
    }
  
    navigateToAccounts() {
      this.router.navigate(['/accounts']);
    }
    navigateToParentControl() {
      this.router.navigate(['/parent-controls']);
    }
    navigateToSettings() {
      this.router.navigate(['/settings']);
    }
    navigateToCourses() {
      this.router.navigate(['/courses']);
    }
}
