import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankAccount, ParentAccount } from '../models/bank-account.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class HomeComponent implements OnInit{
  username: string;
  account: BankAccount;
  parent!: ParentAccount;
  toggleTransaction: boolean = false;
  type: string = 'Spend';
  constructor(private router: Router, private authService: AuthService, private http: HttpClient)
  {
    this.account = this.authService.getAccount()
    this.username = this.authService.getUsername();
    this.http.get<ParentAccount>('http://localhost:4000/parent').subscribe(data => {
      this.parent = data;
      console.log(data);
    });
  }
  
  ngOnInit(): void {
    
    // Subscribe to router events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Update username when navigation ends
      this.username = this.authService.getUsername();
      window.scrollTo(0, 0);
    });
  }
  viewDetails(accountName: string): void {
    // Handle logic to view more details for the selected account
    switch (accountName) {
      case 'Spending':
        // Logic to view details for the Spending account
        this.type = 'Spending';
        this.toggleTransaction = !this.toggleTransaction;
        break;
      case 'Reserve':
        // Logic to view details for the Reserve account
        this.type = 'Reserve';
        this.toggleTransaction = !this.toggleTransaction;

        break;
      case 'Growth':
        this.type = 'Growth';
        this.toggleTransaction = !this.toggleTransaction;
        break;
      case 'MoneyManagers':
        // Logic to view details for the Money Managers account
        this.router.navigate(['/accounts']);
        break;
      case 'Credit Card':
        // Logic to view details for the Credit Card account
        this.type = 'Credit Card';
        this.toggleTransaction = !this.toggleTransaction;
        break;
      default:
        console.log('Invalid account name');
        break;
    }
  }
}
