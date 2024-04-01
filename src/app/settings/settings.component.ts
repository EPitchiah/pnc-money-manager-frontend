import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { ParentalControl } from '../parental-control.service';
import { Login } from '../models/login.model';

interface Log {
  name: string;
  place: string;
  date: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})

export class SettingsComponent implements OnInit{
  rememberDevice: boolean = false;
  username: string;
  password: string;
  authenticate: boolean = false;
  toggleContact: boolean = false;
  togglePassword: boolean = false;
  toggleUserID: boolean = false;
  toggleNotification: boolean = false;
  toggleLogin: boolean = false;

  toggleBudget: boolean = false;
  toggleNewAccount: boolean = false;
  toggleOverdraft: boolean = false;
  toggleTransfer: boolean = false;
  toggleAnonymous: boolean = false;
  
  contactInfo: string = '';
  inputString: string = '';
  contact_method: string = 'email';
  inputStringTwo: string = '';
  inputBool: boolean = false;

  pushNotifications: string = 'Disabled';
  smsNotifications: string = 'Disabled';
  emailNotifications: string = 'Disabled';
  transactionThreshold: number = 0;
  depositMessages: string = 'Disabled';
  withdrawMessages: string = 'Disabled';
  

  budgetAmount: number = this.parentService.getBudgetAmount();
  overdraftAmount: number = this.parentService.getOverdraftAmount();
  checkTransfer: boolean = this.parentService.getAllowTransfer();
  moneyTransfer: number = this.parentService.getTransferAmount();
  anonymous: boolean = this.parentService.checkAnonymous();
  linkNew: number = 0;
  

  inputNumber: number = 0;

  history: Login[] = [];

  constructor(private router: Router, private authService: AuthService, private http: HttpClient, private parentService: ParentalControl)
  {
    this.username = this.authService.getUsername();
    this.password = this.authService.getPassword();
    this.budgetAmount = this.parentService.getBudgetAmount();
    this.overdraftAmount = this.parentService.getOverdraftAmount();
    this.moneyTransfer = this.parentService.getTransferAmount();
  }
  
  ngOnInit(): void {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');
    const hour = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');
    const second = String(today.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;


    const newLogin: Log = {
      name: this.username,
      place: 'Pittsburgh, PA',
      date: formattedDate
    };

    this.http.get<Login[]>('https://pnc-money-manager-backend-production.up.railway.app/login').subscribe(data => {
      // Find the account based on the child's account number
      this.history = data;
      this.history.unshift(newLogin);

    });

    // Subscribe to router events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Update username when navigation ends
      this.username = this.authService.getUsername();
      window.scrollTo(0, 0);
    });
  }
  
  toggleRememberDevice() {
    this.rememberDevice = !this.rememberDevice;
  }

  updateContactInfo() {
    this.contactInfo = this.inputString;
    this.inputString = '';
  }

  changeUserID() {
    this.authService.setUsername(this.username);
  }
  changeAnonymous() {
    this.parentService.setAnonymous(this.anonymous);
  }

  changePassword() {
    this.authService.setPassword(this.password);
    window.alert("Successfully changed");
  }
  manageChildAccountLimit() {
    this.parentService.setBudgetAmount(this.budgetAmount);
  }

  enableOverdraftProtection() {
    this.parentService.setOverdraftAmount(this.overdraftAmount);
  }

  addChildAccount() {
    this.authService.addAccount(this.linkNew);
  }

  manageChildAccountMatching() {
    this.parentService.setMonthlyWithdrawalAmount(this.moneyTransfer);
  }

}
