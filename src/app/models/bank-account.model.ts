interface Transaction {
    transaction_id: string;
    transaction_amount: number;
    posted_date: string;
    transaction_name: string;
    status: string;
}

interface Account {
    accountNumber: number;
    availableBalance: number;
    transactions: Transaction[];
}

interface SpendingAccount extends Account {
    monthlyBudget: number;
    remainingMonthlyBudget: number;
}

interface SavingsAccount extends Account {
    parentalPercentMatch: number;
}

export interface BankAccount {
    spendingAccount: SpendingAccount;
    savingsAccount: SavingsAccount;
}

export interface ParentAccount {
    creditAccount: SpendingAccount;
    growthAccount: SavingsAccount;
    reserveAccount: SavingsAccount;
    spendingAccount: SavingsAccount;
}

