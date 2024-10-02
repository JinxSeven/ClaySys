import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserDash } from '../../../interfaces/user-dash';
import { GoalService } from '../../../services/goal.service';
import { TransactionService } from '../../../services/transaction.service';
import { Chart } from 'chart.js/auto';

@Component({
    selector: 'app-section',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './section.component.html',
    styleUrl: './section.component.css',
})
export class SectionComponent {
    userService = inject(UserService);
    goalService = inject(GoalService);
    transactService = inject(TransactionService);

    userDashData: UserDash[] = this.userService.getUserDashData();
    loggedIndx: number = this.userService.getLoggedIndx();
    loggedUserDashData: UserDash = this.userDashData[this.loggedIndx];

    errorOut: string = "‎";
    arrOfOptions: string[] = this.transactService.returnAptCategories("expense");
    expenseChart: Chart | null = null;
    idx: number | null = null;

    constructor() {}

    updateDashBoardData() {
        this.userDashData = this.userService.getUserDashData();
        this.loggedIndx = this.userService.getLoggedIndx();
        this.loggedUserDashData = this.userDashData[this.loggedIndx];
    }

    ngDoCheck() {
        this.updateDashBoardData();
        this.transactService.updateDashBoardData();
        this.goalService.updateDashBoardData();
        if (this.transactService.updateSignal) {
            this.updateChart();
            this.transactService.updateSignal = false;
        }
    }

    addNewGoal(
        newGoalForm: NgForm,
        overlay: HTMLDivElement,
        newGoalPopup: HTMLDivElement
    ) {
        this.goalService.addNewGoal(newGoalForm, overlay, newGoalPopup);
    }

    openNewGoalPopup(overlay: HTMLDivElement, newGoalPopup: HTMLDivElement) {
        this.goalService.openGoalPopup(overlay, newGoalPopup);
    }

    checkDuplicateGoals(newGoalForm: NgForm): boolean {
        const bool = this.goalService.checkDuplicateGoals(newGoalForm);
        return bool;
    }

    closeNewGoalPopup(
        newGoalForm: NgForm,
        overlay: HTMLDivElement,
        newGoalPopup: HTMLDivElement
    ) {
        this.goalService.closeGoalPopup(newGoalForm, overlay, newGoalPopup);
    }

    openTransactPopup(
        overlay: HTMLDivElement,
        newTransactPopup: HTMLDivElement,
        indx: number | null,
        editTransactForm: NgForm
    ) {
        this.idx = indx;
        this.transactService.openTransactPopup(overlay, newTransactPopup);
        if (indx != null) {
            this.arrOfOptions = this.transactService.returnAptCategories(
                this.loggedUserDashData.transactions[indx].type
            );
            this.transactService.loadTransactionDtls(indx, editTransactForm);
        }
    }

    loadAptCategories(transactForm: NgForm) {
        if (transactForm.form.get('transactTypeSel')?.value == "income") {
            this.arrOfOptions = this.transactService.returnAptCategories("income");
        } else {
            this.arrOfOptions = this.transactService.returnAptCategories("expense");
        }
    }

    addNewTransaction(
        newTransactForm: NgForm,
        overlay: HTMLDivElement,
        newTransactPopup: HTMLDivElement
    ) {
        console.log("newTransactAdded");
        this.transactService.addNewTransaction(newTransactForm, overlay, newTransactPopup);
    }

    closeTransactionPopup(
        newTransactForm: NgForm,
        overlay: HTMLDivElement,
        newTransactPopup: HTMLDivElement
    ) {
        this.transactService.closeTransactionPopup(newTransactForm, overlay, newTransactPopup);
    }

    updateTransaction(
        editTransactForm: NgForm,
        overlay: HTMLDivElement,
        editTransactPopup: HTMLDivElement
    ) {
        this.transactService.updateTransaction(editTransactForm, overlay, editTransactPopup, this.idx!);
    }

    delTransaction(indx: number): void {
        this.transactService.delTransaction(indx);
    }

    ngAfterViewInit() {
        const chartElement = document.getElementById('expense-chart') as HTMLCanvasElement;
        if (!chartElement) return;
        else this.initializeChart(chartElement);
    }

    initializeChart(chartElement: HTMLCanvasElement) {
        this.expenseChart = new Chart(chartElement, {
            type: 'bar',
            data: {
                labels: [
                "Entertainment",
                "Health",
                "Shopping",
                "Travel",
                "Education",
                "Other"
                ],
                datasets: [{
                label: 'Expense',
                data: this.updateExpenseChartData(),
                backgroundColor: "#af92ff"
            }]
            },
            options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                },
            }
        });
    }

    updateExpenseChartData(): number[] {
        const transactions = this.loggedUserDashData.transactions || [];
        const expenses = transactions.filter((itr: any) => itr.type === "expense");

        const categories = ["Entertainment", "Health", "Shopping", "Travel", "Education", "Other"];
        const categoryMap = new Map(categories.map(categ => [categ, 0]));

        expenses.forEach(expense => {
            const category = this.getCategoryFromPurpose(expense.category);
            if (category) {
                categoryMap.set(category, (categoryMap.get(category) || 0) + expense.amount);
            }
        });

        return Array.from(categoryMap.values());
    }

    getCategoryFromPurpose(purpose: string): string | null {
        const categories = [
            { purpose: 'entertainment', category: 'Entertainment' },
            { purpose: 'health', category: 'Health' },
            { purpose: 'shopping', category: 'Shopping' },
            { purpose: 'travel', category: 'Travel' },
            { purpose: 'education', category: 'Education' },
            { purpose: 'other', category: 'Other' }
        ];

        const matchingCategory = categories.find(categ => categ.purpose.toLowerCase() === purpose.toLowerCase());
        return matchingCategory ? matchingCategory.category : null;
    }

    updateChart() {
        if (this.expenseChart) {
            this.expenseChart.data.datasets.forEach((dataset: any) => {
                dataset.data = this.updateExpenseChartData();
            });
            this.expenseChart.update();
        }
        console.log("update_chart");
    }

    filterChartReset() {
        const exp = this.updateExpenseChartData();
        const expname = ["Entertainment", "Health", "Shopping", "Travel", "Education", "Other"];
        this.expenseChart!.data.labels = expname;
        this.expenseChart!.config.data.datasets[0].data = exp;
        this.expenseChart!.update();
        console.log("filter_chart_reset");
        this.updateChart()
    }

    filterChartEntertain() {
        const exp = this.updateExpenseChartData();
        const expname = ["Entertainment"];
        this.expenseChart!.data.labels = expname;
        this.expenseChart!.config.data.datasets[0].data = [exp[0]];
        this.expenseChart!.update();
    }

    filterChartHealth() {
        const exp = this.updateExpenseChartData();
        const expname = ["Health"];
        this.expenseChart!.data.labels = expname;
        this.expenseChart!.config.data.datasets[0].data = [exp[1]];
        this.expenseChart!.update();
    }

    filterChartShopping() {
        const exp = this.updateExpenseChartData();
        const expname = ["Shopping"];
        this.expenseChart!.data.labels = expname;
        this.expenseChart!.config.data.datasets[0].data = [exp[2]];
        this.expenseChart!.update();
    }

    filterChartTravel() {
        const exp = this.updateExpenseChartData();
        const expname = ["Travel"];
        this.expenseChart!.data.labels = expname;
        this.expenseChart!.config.data.datasets[0].data = [exp[3]];
        this.expenseChart!.update();
    }

    filterChartEducation() {
        const exp = this.updateExpenseChartData();
        const expname = ["Education"];
        this.expenseChart!.data.labels = expname;
        this.expenseChart!.config.data.datasets[0].data = [exp[4]];
        this.expenseChart!.update();
    }

    filterChartOther() {
        const exp = this.updateExpenseChartData();
        const expname = ["Other"];
        this.expenseChart!.data.labels = expname;
        this.expenseChart!.config.data.datasets[0].data = [exp[5]];
        this.expenseChart!.update();
    }
}
