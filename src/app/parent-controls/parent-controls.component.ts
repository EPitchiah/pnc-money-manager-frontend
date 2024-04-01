import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { filter } from 'rxjs';
import { ParentalControl } from '../parental-control.service';
import { HttpClient } from '@angular/common/http';
import { BankAccount } from '../models/bank-account.model';


@Component({
  selector: 'app-parent-controls',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatDividerModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatFormField, MatTableModule, MatListModule, CommonModule],
  templateUrl: './parent-controls.component.html',
  styleUrl: './parent-controls.component.css'
})
export class ParentControlsComponent implements OnInit {
  account: BankAccount;
  public allowUse = true;
  public allowMonthly = false;
  public monthlyWithdrawalAmount = 0;
  public enableOverdraft = false;
  public overdraftAmount = 0;
  public allowTransfer = false;
  public transferAmount = 0;
  public manageBudget = false;
  public budgetAmount = 0;
  public matchingPercentage = 0;
  public anonymous = false;

  username: string;
  child_account: number = this.authService.getAccount();

  constructor(private router: Router, private authService: AuthService, private parentService: ParentalControl, private http: HttpClient)
  {
    this.account = this.authService.getAccount();

    this.parentService.setMatchingPercentage(this.account.savingsAccount.parentalPercentMatch);
    this.parentService.setBudgetAmount(this.account.spendingAccount.monthlyBudget);

    this.username = this.authService.getUsername();
    this.allowUse = this.parentService.getAllowUse();
    this.allowMonthly = this.parentService.getAllowMonthly();
    this.monthlyWithdrawalAmount = this.parentService.getMonthlyWithdrawalAmount();
    this.enableOverdraft = this.parentService.getEnableOverdraft();
    this.overdraftAmount = this.parentService.getOverdraftAmount();
    this.allowTransfer = this.parentService.getAllowTransfer();
    this.transferAmount = this.parentService.getTransferAmount();
    this.manageBudget = this.parentService.getManageBudget();
    this.budgetAmount = this.parentService.getBudgetAmount();
    this.matchingPercentage = this.parentService.getMatchingPercentage();
    this.anonymous = this.parentService.checkAnonymous();
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
  applyControls(){
    this.parentService.setAllowUse(this.allowUse);
    this.parentService.setAllowMonthly(this.allowMonthly);
    this.parentService.setMonthlyWithdrawalAmount(this.monthlyWithdrawalAmount);
    this.parentService.setEnableOverdraft(this.enableOverdraft);
    this.parentService.setOverdraftAmount(this.overdraftAmount);
    this.parentService.setAllowTransfer(this.allowTransfer);
    this.parentService.setTransferAmount(this.transferAmount);
    this.parentService.setManageBudget(this.manageBudget);
    this.parentService.setBudgetAmount(this.budgetAmount);
    this.parentService.setMatchingPercentage(this.matchingPercentage);
    this.parentService.setAnonymous(this.anonymous);
    this.router.navigate(['/accounts']);
  }

}
