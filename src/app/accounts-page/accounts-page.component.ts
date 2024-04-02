import { ChangeDetectorRef, Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list'
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ParentalControl } from '../parental-control.service';

interface Transaction {
  transaction_id: string;
  transaction_amount: string;
  posted_date: string;
  transaction_name: string;
  status: string;
}

@Component({
  selector: 'app-accounts-page',
  standalone: true,
  imports: [FormsModule, MatGridListModule, MatIconModule, MatButtonModule, MatDividerModule, CommonModule, MatInputModule, MatTableModule, MatListModule, LoginComponent, CommonModule],
  templateUrl: './accounts-page.component.html',
  styleUrl: './accounts-page.component.css'
})
export class AccountsPageComponent {

  number_of_accounts = 0;
  accounts: Account[] = [];
  type = "";
  available_balance = 0;
  customer_name = "";
  account_number: number = 0;
  monthly_budget = 0;
  spent_this_month = 0;
  parental_match_percentage = 0;
  password = "";
  username: string;
  account_pass: string;

  improvementPercentage: number = 10; // Example improvement/decrease percentage


  spendingTransactions: number = 10;
  savingsTransactions: number = 10;
  savingsLog: Transaction[] = [];
  spendingLog: Transaction[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef, private router: Router, private authService: AuthService, private http: HttpClient, private parentService: ParentalControl)
  {
    this.username = this.authService.getUsername();
    this.account_pass = this.authService.getPassword();
  }

  child_account: number = this.authService.getAccount(); 
  account: any;
  budget_increase: number = 0;
  make_transaction: number = 0;
  transaction_place: string = '';
  withdrawal_amount: number = 0;
  deposit_amount: number = 0;
  toggleIncrease: boolean = false;
  toggleTransaction: boolean = false;
  toggleWithdraw: boolean = false;
  toggleDeposit: boolean = false;
  toggleLog: boolean = false;
  show_link_account: boolean = false;

  parentMatch: number = 0;
  budgetAmount: number = 0;

  allowUse = true;
  allowMonthly = false;
  enableOverdraft = false;
  allowTransfer = false;
  manageBudget = false;

  ngOnInit(): void {
    this.account = this.authService.getAccount()
    this.savingsLog = this.account.savingsAccount.transactions;
    this.spendingLog = this.account.spendingAccount.transactions;
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Update username when navigation ends
      this.username = this.authService.getUsername();
      window.scrollTo(0, 0);
    });
    this.setVariables();
  }

  ngOnDestroy(): void
  {

  }
  setVariables() {
    this.parentService.setMatchingPercentage(this.account.savingsAccount.parentalPercentMatch);
    this.parentService.setBudgetAmount(this.account.spendingAccount.monthlyBudget);
    this.parentMatch = +this.parentService.getMatchingPercentage();
    this.budgetAmount = +this.parentService.getBudgetAmount();

    this.allowUse = this.parentService.getAllowUse();
    this.allowMonthly = this.parentService.getAllowMonthly();
    this.enableOverdraft = this.parentService.getEnableOverdraft();
    this.allowTransfer = this.parentService.getAllowTransfer();
    this.manageBudget = this.parentService.getManageBudget();
  }

  linkAccount() {
    if(this.password === this.account_pass)
    {
      var num: number = this.account_number;
      this.authService.setAccount(num);
      var acc = this.authService.getAccount();
      if (acc) {
        this.account = acc;
        this.savingsLog = this.account.savingsAccount.transactions;
        this.spendingLog = this.account.spendingAccount.transactions;
        window.alert('New Account has been Linked!');
        this.router.navigate(['/settings']);
      }
    }
    else
    {
      window.alert("Invalid Password");
    }
    this.show_link_account = false;
    this.password = '';
    this.account_number = 0;
  }
  requestIncrease(){
    if (!this.account) {
      return;
    }
    console.log(this.budgetAmount)
    this.account.spendingAccount.monthlyBudget = this.budgetAmount + this.budget_increase;
    this.parentService.setBudgetAmount(this.budgetAmount + this.budget_increase);
    this.budget_increase = 0;
  }
  changeSpending()
  {
    if (!this.account) {
      return;
    }
    if(this.make_transaction != 0 && this.transaction_place != '')
    {
      if(this.make_transaction > this.account.spendingAccount.remainingMonthlyBudget)
      {
        window.alert('Error: Request Monthly Budget Increase');
        return;
      }

      if(this.make_transaction > this.account.spendingAccount.availableBalance)
      {
        window.alert('Error: Purchase Declined');
        return;
      }
      if(this.make_transaction != 0)
      {
        // Update monthlyBudget in the account object
        this.account.spendingAccount.remainingMonthlyBudget -= this.make_transaction;
        this.account.spendingAccount.availableBalance -= this.make_transaction;

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        // Generate a unique transaction ID
        const nextTransactionId = (this.account.spendingAccount.transactions.length + 1).toString();

        // Determine the transaction name based on deposit or withdrawal
        const transactionName = this.transaction_place;

        const amount = this.make_transaction;

        // Create the new transaction entry
        const newTransaction: Transaction = {
          transaction_id: nextTransactionId,
          transaction_amount: amount.toFixed(2),
          posted_date: formattedDate,
          transaction_name: transactionName,
          status: 'pending'
        };

        // Add the new transaction to the transactions array
        this.spendingLog.unshift(newTransaction);

        // Reset budget_increase to 0
        this.make_transaction = 0;
        this.transaction_place = '';
      }
    }
  }

  changeSavings()
  {
    if (!this.account) {
      return;
    }
    if(this.deposit_amount != 0)
    {
    // Update monthlyBudget in the account object
    this.account.savingsAccount.availableBalance += this.deposit_amount;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    // Generate a unique transaction ID
    const nextTransactionId = (this.account.savingsAccount.transactions.length + 1).toString();

    // Determine the transaction name based on deposit or withdrawal
    const transactionName = 'Deposit';

    const amount = this.deposit_amount;

    // Create the new transaction entry
    const newTransaction: Transaction = {
      transaction_id: nextTransactionId,
      transaction_amount: amount.toFixed(2),
      posted_date: formattedDate,
      transaction_name: transactionName,
      status: 'pending'
    };

    // Add the new transaction to the transactions array
    this.savingsLog.unshift(newTransaction);

    // Reset budget_increase to 0
    this.deposit_amount = 0;
    }

    if(this.withdrawal_amount != 0)
    {
    // Update monthlyBudget in the account object
    this.account.savingsAccount.availableBalance -= this.withdrawal_amount;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

// Generate a unique transaction ID
    const nextTransactionId = (this.account.savingsAccount.transactions.length + 1).toString();

    // Determine the transaction name based on deposit or withdrawal
    const transactionName = 'Withdrawal';

    const amount = (this.withdrawal_amount * -1);

    // Create the new transaction entry
    const newTransaction = {
      transaction_id: nextTransactionId,
      transaction_amount: amount.toFixed(2),
      posted_date: formattedDate,
      transaction_name: transactionName,
      status: 'pending'
    };

    // Add the new transaction to the transactions array
    this.savingsLog.unshift(newTransaction);

    // Reset budget_increase to 0
    this.withdrawal_amount = 0;
    }

  }

  setPass( event: Event) {
    this.password = String((event.target as HTMLInputElement).value);
    console.log(this.password);
  }

  sendBack()
  {
    this.router.navigate(['/home']);
  }

  sendToParentalControl()
  {
    this.router.navigate(['/parent-controls']);
  }

  sendToProgress()
  {
    this.router.navigate(['/leaderboard']);
  }
}

export class Account {
  type!: string;
  available_balance!: number;
  customer_name!: string;
  account_number!: number;
  monthly_budget!: number;
  spent_this_month!: number;
  parental_match_percentage!: number;
}
