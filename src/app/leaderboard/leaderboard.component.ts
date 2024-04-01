import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { filter } from 'rxjs';
import { LeaderboardEntry } from '../models/leaderboard-entry.model';
import { FormsModule } from '@angular/forms';
import { ParentalControl } from '../parental-control.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LeaderboardComponent implements OnInit {
  leaderboardData: LeaderboardEntry[] = [];
  sortOrder: 'asc' | 'desc' = 'asc'; // Default sorting order
  sortedBy: string = ''; // Currently sorted column
  username: string;
  selectedState: string = '';
  selectedCity: string = '';
  selectedAge: string = '';
  selectedDuration: string = '';
  states: string[] = ['PA', 'AL', 'TX', 'OH'];
  filteredLeaderboard: LeaderboardEntry[] = [];
  ages: string[] = ['8-10', '11-13', '14-16'];
  durations: string[] = ['< 1 Year', '1-3 Years', '4-6 Years', '7+ Years'];
  anonymous: boolean = false;


  constructor(private router: Router, private http: HttpClient, private authService: AuthService, private parentService: ParentalControl, private cdRef: ChangeDetectorRef)
  {
    this.username = this.authService.getUsername();
  }
    

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Update username when navigation ends
      this.username = this.authService.getUsername();
      window.scrollTo(0, 0);
    });
    this.anonymous = this.parentService.checkAnonymous();
    this.getLeaderboardData();
  }

  // Method to update filtered leaderboard
  updateFilteredLeaderboard(): void {
    this.filteredLeaderboard = this.getFilteredLeaderboard();
    console.log('Filtered Leaderboard Data:', this.filteredLeaderboard);
  }

  // Method to get filtered leaderboard data
  getFilteredLeaderboard(): LeaderboardEntry[] {
    let filteredData = this.leaderboardData;

    console.log('Selected State:', this.selectedState);
    if (this.selectedState !== '' && this.selectedCity !== '') {
      filteredData = filteredData.filter(entry => entry.state === this.selectedState && entry.city === this.selectedCity);
    }
    if (this.selectedAge !== '') {
      if(this.selectedAge === '8-10')
        filteredData = filteredData.filter(entry => entry.age > 7 && entry.age < 11);
      if(this.selectedAge === '11-13')
        filteredData = filteredData.filter(entry => entry.age > 10 && entry.age < 14);
      if(this.selectedAge === '14-16')
        filteredData = filteredData.filter(entry => entry.age > 13 && entry.age < 17);
    }
    if (this.selectedDuration !== '') {
      if(this.selectedDuration === '< 1 Year')
        filteredData = filteredData.filter(entry => entry.duration < 12);
      if(this.selectedDuration === '1-3 Years')
        filteredData = filteredData.filter(entry => entry.duration > 11 && entry.duration < 48);
      if(this.selectedDuration === '4-6 Years')
        filteredData = filteredData.filter(entry => entry.duration > 47 && entry.duration < 84);
      if(this.selectedDuration === '7+ Years')
        filteredData = filteredData.filter(entry => entry.duration > 83 && entry.duration < 120);
    } 
    if (this.selectedState !== '') {
      filteredData = filteredData.filter(entry => entry.state === this.selectedState);
    }
    return filteredData;
  }


  getFilteredCities(): string[] {
    return Array.from(new Set(this.leaderboardData.filter(entry => entry.state === this.selectedState).map(entry => entry.city)));
  }  
  
  getLeaderboardData(): void {
    this.http.get<LeaderboardEntry[]>('https://pnc-money-manager-backend-production.up.railway.app/leader').subscribe(data => {
      this.leaderboardData = data;
      this.updateFilteredLeaderboard();
    });
  }

  navigateToCourses() {
    this.router.navigate(['/courses']);
  }
  navigateToAccounts() {
    this.router.navigate(['/accounts']);
  }

  
  sortByScore(): void {
    this.filteredLeaderboard.sort((a: { score: number; }, b: { score: number; }) => {
      if (this.sortOrder === 'asc') {
        return b.score - a.score;
      } else {
        return a.score - b.score;
      }
    });
    this.sortedBy = 'score';
    this.toggleSortOrder();
  }
  sortByDuration(): void {
    this.filteredLeaderboard.sort((a: { duration: number; }, b: { duration: number; }) => {
      if (this.sortOrder === 'asc') {
        return a.duration - b.duration;
      } else {
        return b.duration - a.duration;
      }
    });
    this.sortedBy = 'duration';
    this.toggleSortOrder();
  }

  sortByName(): void {
    this.filteredLeaderboard.sort((a: { name: string; }, b: { name: string; }) => {
      if (this.sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    this.sortedBy = 'name';
    this.toggleSortOrder();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }
}


