export function getUserDash() {
    const userDash = localStorage.getItem('userDash');
    return userDash ? JSON.parse(userDash) : [];
}
export function setUserDash(userDash) {
    localStorage.setItem('userDash', JSON.stringify(userDash));
    console.log('setUserDash');
}
export function universalLenValidator(inputField, inputLength) {
    const inpLen = String(inputField.value);
    if (Number(inpLen.length) > Number(inputLength)) {
        inputField.style.borderColor = 'rgb(218, 43, 43)';
        alert('Permited length exceded!');
        return false;
    }
    return true;
}
export function universalNaNValidator(inputField) {
    if (isNaN(Number(inputField.value))) {
        inputField.style.borderColor = 'rgb(218, 43, 43)';
        alert('Invalid input type!');
        return false;
    }
    inputField.style.borderColor = '#d8d8d8';
    return true;
}
export function universalValidator(inputField) {
    if (inputField.value == '') {
        inputField.style.borderColor = 'rgb(218, 43, 43)';
        return false;
    }
    inputField.style.borderColor = '#d8d8d8';
    return true;
}
export function validateEmailInput(emailInput, errorDisplay) {
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
export function validatePassInput(passwordInput, errorDisplay) {
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
export function getUsersFromLocalStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}
export function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
export function getCurrentLoggedUser() {
    const loggedUser = localStorage.getItem('loggedUser');
    // console.log(typeof(loggedUser));
    if (loggedUser) {
        return JSON.parse(loggedUser);
    }
}
export function setCurrentLoggedUser(loggedUser) {
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
}
export function isEmailDuplicate(email) {
    const users = getUsersFromLocalStorage();
    for (const user of users) {
        if (user.email === email) {
            return true;
        }
        ;
    }
    return false;
}