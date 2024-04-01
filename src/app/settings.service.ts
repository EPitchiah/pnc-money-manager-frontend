import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private username: string;
  
  constructor (private authService: AuthService)
  {
    this.username = authService.getUsername();
  }
  private contactInfo: string = '';
  
  logout(){
    this.username = '';
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }
}
