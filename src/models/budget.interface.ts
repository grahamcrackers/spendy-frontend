import { Expense } from './expense.interface';

export interface Budget {
    _id?: string;
    name: string;
    userEmail: string;
    amount: number;
    startDate: string;
    endDate?: string;
    showInMenu: boolean;
    createdAt: string;
    updatedAt: string;
    expenses: Expense[];
}
