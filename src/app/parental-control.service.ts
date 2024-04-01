import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { BankAccount } from './models/bank-account.model';

@Injectable({
  providedIn: 'root'
})
export class ParentalControl {
  private allowUse = true;
  private allowMonthly = false;
  private monthlyWithdrawalAmount = 0;
  private enableOverdraft = false;
  private overdraftAmount = 0;
  private allowTransfer = false;
  private transferAmount = 0;
  private manageBudget = true;
  private budgetAmount = 0;
  private matchingPercentage = 0;
  private anonymous = false;

  constructor(private authService: AuthService, private http: HttpClient)
  {
    
  }

  checkAnonymous(): boolean {
    return this.anonymous;
  }
  setAnonymous(value: boolean) {
    this.anonymous = value;
  }
  getAllowUse(): boolean {
    return this.allowUse;
  }

  setAllowUse(value: boolean) {
    this.allowUse = value;
  }

  getAllowMonthly(): boolean {
    return this.allowMonthly;
  }

  setAllowMonthly(value: boolean) {
    this.allowMonthly = value;
  }

  getMonthlyWithdrawalAmount(): number {
    return this.monthlyWithdrawalAmount;
  }

  setMonthlyWithdrawalAmount(value: number) {
    this.monthlyWithdrawalAmount = value;
  }

  getEnableOverdraft(): boolean {
    return this.enableOverdraft;
  }

  setEnableOverdraft(value: boolean) {
    this.enableOverdraft = value;
  }

  getOverdraftAmount(): number {
    return this.overdraftAmount;
  }

  setOverdraftAmount(value: number) {
    this.overdraftAmount = value;
  }

  getAllowTransfer(): boolean {
    return this.allowTransfer;
  }

  setAllowTransfer(value: boolean) {
    this.allowTransfer = value;
  }

  getTransferAmount(): number {
    return this.transferAmount;
  }

  setTransferAmount(value: number) {
    this.transferAmount = value;
  }

  getManageBudget(): boolean {
    return this.manageBudget;
  }

  setManageBudget(value: boolean) {
    this.manageBudget= value;
  }

  getBudgetAmount(): number {
    return this.budgetAmount;
  }

  setBudgetAmount(value: number) {
    const account = this.authService.getAccount();
    account.spendingAccount.monthlyBudget = value;
    this.http.put<BankAccount>('http://localhost:4000/child', account).subscribe(
      response => {
        console.log('Account updated successfully:', response);
      },
      error => {
        console.error('Error updating account:', error);
      }
    );
    this.budgetAmount = value;
  }

  getMatchingPercentage(): number {
    return this.matchingPercentage;
  }

  setMatchingPercentage(value: number) {
    const account = this.authService.getAccount();
    account.savingsAccount.parentalPercentMatch = value;
    this.http.put<BankAccount>('http://localhost:4000/child', account).subscribe(
      response => {
        console.log('Account updated successfully:', response);
      },
      error => {
        console.error('Error updating account:', error);
      }
    );
    this.matchingPercentage = value;
  }
}
