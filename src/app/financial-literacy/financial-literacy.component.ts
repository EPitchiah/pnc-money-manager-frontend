import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Course, CourseCategory } from '../models/course.model';

@Component({
  selector: 'app-financial-literacy',
  standalone: true,
  imports: [FormsModule, MatGridListModule, MatIconModule, MatDividerModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatFormField, MatTableModule, MatListModule, CommonModule],
  templateUrl: './financial-literacy.component.html',
  styleUrl: './financial-literacy.component.css'
})
export class FinancialLiteracyComponent implements OnInit {
  username: string;
  basicCourses: Course[] = [];
  intermediateCourses: Course[] = [];
  advancedCourses: Course[] = [];
  allTracks: string[] = ["Money Basics", "Smart Spending", "Banking Basics", "Saving and Investing", "Financial Responsibility"];
  selectedTrack: string = "all";

  constructor(private router: Router, private authService: AuthService, private http: HttpClient)
  {
    this.username = this.authService.getUsername();
  }
  
  ngOnInit(): void {
    this.http.get<CourseCategory>('http://localhost:4000/course').subscribe(data => {
      this.basicCourses = data.basicCourses;
      this.intermediateCourses = data.intermediateCourses;
      this.advancedCourses = data.advancedCourses;
    });
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Update username when navigation ends
      this.username = this.authService.getUsername();
      window.scrollTo(0, 0);
    });
  }

  backToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }
  
  navigateToCourse(courseTitle: string): void {
    this.router.navigate(['/course-details', { title: courseTitle }]);
  }

  filterCoursesByTrack(event: any) {
    this.selectedTrack = event.target.value;
  }

  get filteredBasicCourses() {
    return this.selectedTrack === 'all' ? this.basicCourses : this.basicCourses.filter(course => course.track === this.selectedTrack);
  }

  get filteredIntermediateCourses() {
    return this.selectedTrack === 'all' ? this.intermediateCourses : this.intermediateCourses.filter(course => course.track === this.selectedTrack);
  }

  get filteredAdvancedCourses() {
    return this.selectedTrack === 'all' ? this.advancedCourses : this.advancedCourses.filter(course => course.track === this.selectedTrack);
  }

}
