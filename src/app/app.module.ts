import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { routes } from './app.routes'; // Import appRoutes from app.routes.ts
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HttpFeature, HttpFeatureKind, withFetch } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Configure the router with appRoutes
    MatSidenavModule, MatGridListModule, MatIconModule, MatDividerModule, MatButtonModule, RouterModule
  ],
  providers: [provideHttpClient(withFetch()), HttpClientModule, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
function provideHttpClient(arg0: HttpFeature<HttpFeatureKind.Fetch>): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

