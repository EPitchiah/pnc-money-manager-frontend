import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private leaderboard: any[] = [];
  private username: string = '';
  private password: string = 'tdp14';
  private account_num: number = 2367;
  private account: any;
  private allAccounts: any[] = [];

  constructor(private http: HttpClient)
  {
    this.http.get<any>('http://localhost:4000/child').subscribe(data => {
      // Find the account based on the child's account number
      this.account = data.find((entry: any) => entry.spendingAccount.accountNumber === this.account_num
        || entry.savingsAccount.accountNumber === this.account_num);
    });
    this.allAccounts.concat(this.account);
  }

  logout(){
    this.username = '';
    this.password = '';
  }

  setUsername(username: string) {
    this.username = username;
  }
  setPassword(password: string) {
    this.password = password;
  }
  setAccount(account: number) {
    this.http.get<any>('http://localhost:4000/child').subscribe(data => {
      // Find the account based on the child's account number
      this.account = data.find((entry: any) => entry.spendingAccount.accountNumber === account
        || entry.savingsAccount.accountNumber === account);
    });
    this.account_num = account;
  }
  addAccount(account: number) {
    var temp = this.account;
    this.http.get<any>('http://localhost:4000/child').subscribe(data => {
      // Find the account based on the child's account number
      temp = data.find((entry: any) => entry.spendingAccount.accountNumber === account
        || entry.savingsAccount.accountNumber === account);
    });
    if(!temp)
      this.allAccounts.concat(temp);
  }

  getUsername(): string {
    return this.username;
  }
  getPassword(): string {
    return this.password;
  }
  getAccount() {
    return this.account;
  }
  getAccountNum() {
    return this.account_num;
  }
  getAccountList(){
    return this.allAccounts;
  }
  getLeaderboard(): any[] {
    this.http.get<any[]>('http://localhost:4000/leader').subscribe(data => {
      this.leaderboard = data;
      console.log("This is the leaderboard info: ", this.leaderboard);
    });
    return this.leaderboard;
  }
}
