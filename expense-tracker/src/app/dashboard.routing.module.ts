import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatabaseService } from './database.service';
import { HttpClientModule } from '@angular/common/http';
// import { ViewExpensesComponent } from './components/view-expenses/view-expenses.component';

const routes: Routes = [
    {path: '',
    component: DashboardComponent,
    children: [
        {path: 'home', component: HomeComponent},
        {path: 'add-expense', component: AddExpenseComponent},
        // {path: 'view-expenses', component: ViewExpensesComponent}
    ]}
];

@NgModule({
    declarations: [AddExpenseComponent],
    imports: [RouterModule.forChild(routes), FormsModule, HttpClientModule, BrowserModule],
    exports: [RouterModule],    
    providers: [DatabaseService]
  })
  export class DashboardRoutingModule { }