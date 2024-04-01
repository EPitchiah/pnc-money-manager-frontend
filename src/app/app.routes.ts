import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountsPageComponent } from './accounts-page/accounts-page.component';
import { ParentControlsComponent } from './parent-controls/parent-controls.component';
import { FinancialLiteracyComponent } from './financial-literacy/financial-literacy.component';
import { SettingsComponent } from './settings/settings.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RoleGuardService } from './role-guard.service';
import { AuthGuard } from './auth.guard';
import { CourseDetailsComponent } from './course-details/course-details.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [RoleGuardService], data: { expectedRole: 'parent'} },
    { path: 'accounts', component: AccountsPageComponent, canActivate: [AuthGuard]},
    { path: 'parent-controls', component: ParentControlsComponent, canActivate: [RoleGuardService], data: { expectedRole: 'parent'}},
    { path: 'courses', component: FinancialLiteracyComponent, canActivate: [AuthGuard]},
    { path: 'course-details', component: CourseDetailsComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
    { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '', pathMatch: 'full' } 
];
