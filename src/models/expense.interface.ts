import { Budget } from './budget.interface';

export interface Expense {
    _id?: string;
    userEmail: string;
    place: string;
    date: Date;
    price: number;
    reason: string;
    recurring: boolean;
    recurUntil?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    budget: string | Budget;
}
