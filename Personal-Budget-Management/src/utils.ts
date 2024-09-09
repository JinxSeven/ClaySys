export interface User {
    userName: string;
    email: string;
    password: string;
}

export interface UserDash {
    name: string;
    email: string;
    totalIncome: number;
    totalExpense: number;
    totalBalance: number;
    goals: Goal[];
    bills: Bill[];
    transactions: Transaction[];
}

export interface Goal {
    name: string;
    target: number;
    initialContribution: number;
}

export interface Bill {
    name: string;
    amount: number;
    dueDate: string;
}

export interface Transaction {
    type: string;
    amount: number;
    date: string;
    purpose: string;
}

export interface LoggedUser {
    email: string;
}

export function getUserDash(): UserDash[] {
    const userDash = localStorage.getItem('userDash');
    return userDash ? JSON.parse(userDash) : [];
}

export function setUserDash(userDash: UserDash[]) {
    localStorage.setItem('userDash', JSON.stringify(userDash));
    console.log('setUserDash');
}

export function universalValidator(inputField: HTMLInputElement): boolean {
    if (inputField.value == '') {
        inputField.style.borderColor = 'rgb(218, 43, 43)';
        return false;
    }
    inputField.style.borderColor = '#d8d8d8';
    return true;
}

export function validateEmailInput(emailInput: HTMLInputElement, errorDisplay: HTMLParagraphElement): boolean {
    const email = emailInput.value.trim();
    const validateEmailInput = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        emailInput.style.borderColor = 'rgb(218, 43, 43)';
        errorDisplay.innerText = 'Email field empty!';
        errorDisplay.style.opacity = '1';
        return false;
    }
    if (!validateEmailInput.test(email)) {
        emailInput.style.borderColor = 'rgb(218, 43, 43)';
        errorDisplay.innerText = 'Invalid email!';
        errorDisplay.style.opacity = '1';
        return false;
    }
    // errorDisplay.innerText = 'Invalid username or password!';
    errorDisplay.style.opacity = '0';
    emailInput.style.borderColor = '#d8d8d8';
    return true;
}

export function validatePassInput(passwordInput: HTMLInputElement, errorDisplay: HTMLParagraphElement): boolean {
    const email = passwordInput.value.trim();

    if (!email) {
        passwordInput.style.borderColor = 'rgb(218, 43, 43)';
        errorDisplay.innerText = 'Password field empty!';
        errorDisplay.style.opacity = '1';
        return false;
    }
    // errorDisplay.innerText = 'Invalid username or password!';
    errorDisplay.style.opacity = '0';
    passwordInput.style.borderColor = '#d8d8d8';
    return true;
}

export function getUsersFromLocalStorage(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

export function saveUsersToLocalStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
}

export function getCurrentLoggedUser() {
    const loggedUser = localStorage.getItem('loggedUser');
    // console.log(typeof(loggedUser));
    if (loggedUser) {
        return JSON.parse(loggedUser);
    }
}

export function setCurrentLoggedUser(loggedUser: LoggedUser) {
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
}

export function isEmailDuplicate(email: string): boolean {
    const users = getUsersFromLocalStorage();
    for (const user of users) {
        if (user.email === email) {
            return true
        };
    }
    return false;
}
