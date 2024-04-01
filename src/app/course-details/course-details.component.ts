import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Course } from '../models/course.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  courseTitle!: string;
  course!: Course;
  username: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private authService: AuthService,)
  {
    this.username = this.authService.getUsername();
  }

  backToCourses() {
    this.router.navigate(['/courses']);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseTitle = params['title'];
      this.http.get<any>('https://pnc-money-manager-backend-production.up.railway.app/course').subscribe(data => {
        this.course = data.basicCourses.concat(data.intermediateCourses, data.advancedCourses)
          .find((course: Course) => course.title === this.courseTitle);
      });
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Update username when navigation ends
      this.username = this.authService.getUsername();
      window.scrollTo(0, 0);
    });
  }
}