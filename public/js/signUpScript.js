const setNone = (inputId) => {
    let input = document.getElementById(inputId);
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.parentElement.childNodes.forEach( (el) => {
        if (el.classList.contains('invalid-feedback')) {
            el.remove();
        }
    });
}
const setInvalid = (inputId, errors) => {
    setNone(inputId);
    let input = document.getElementById(inputId);
    input.classList.add('is-invalid');
    errors.forEach( (error) => {
        let errorDiv = document.createElement('div');
        errorDiv.classList.add('invalid-feedback');
        errorDiv.innerHTML = error
        if (input.nextSibling) {
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        } else {
            input.parentElement.appendChild(errorDiv);
        }
    });
}
const setValid = (inputId) => {
    setNone(inputId);
    let input = document.getElementById(inputId);
    input.classList.add('is-valid');
}
const validEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
const validateUsername = () => {
    let username = document.getElementById('username').value.trim();
    let valid = false;
    if (username==='') {
        setInvalid('username', ["Username cannot be empty"]);
    } else if (username.length > 80){
        setInvalid('username', ["Username length max 80 "]);
    } else {
        setValid('username');
        valid = true;
    }
    return valid;
}

const validateEmail = () => {
    let email = document.getElementById('email').value.trim();
    let valid = false;
    if (email.trim()==='') {
        setInvalid('email', ["Email cannot be empty"]);
    } else if (!validEmail(email)){
        setInvalid('email', ["Enter valid email"]);
    } else {
        setValid('email')
        valid = true;
    }
    return valid;
}
const validatePassword = () => {
    const password = document.getElementById('password').value.trim();
    let valid = false;
    if (password.trim()==='') {
        setInvalid('password', ["Password cannot be empty"]);
    } else if (password.length < 5) {
        setInvalid('password', ["Password should be at least 5 characters long"]);
    } else if (! /[0-9]/.test(password) ) {
        setInvalid('password', ["Password should contains at least 1 number"]);
    } else  if (! /[A-Z]/.test(password)) {
        setInvalid('password', ["Password shoul contains at least 1 big character"])
    } else {
        setValid('password');
        valid = true;
    }
    return valid;
}
const validateConfirmPassword = () => {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let valid = false;
    if (confirmPassword.trim()==='' || confirmPassword!== password) {
        setInvalid('confirmPassword', ["Password are not identical"])
    } else {
        setValid('confirmPassword');
        valid = true;
    }
    return valid;
}

const validateAgreement = () => {
    let agreement = document.getElementById('agreement');
    let valid = false;
    if(!agreement.checked){
        setInvalid('agreement', ['You have to check']);
    } else {
        setValid('agreement');
        valid = true;
    }
    return valid;
}

const initPage = () => { 
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const signUpForm = document.getElementById('signUp');

    username.addEventListener('focusout', () => {
        validateUsername();
    });
    email.addEventListener('focusout', () => {
        validateEmail();
    });
    password.addEventListener('focusout', () => {
        validatePassword();
    });
    confirmPassword.addEventListener('focusout', () => {
        validateConfirmPassword();
    });
    signUpForm.addEventListener('submit', (event) => {
        let usernameValid = validateUsername();
        let emailValid = validateEmail();
        let passwordValid = validatePassword();
        let passwordConfirmValid = validateConfirmPassword();
        let agreementValid = validateAgreement();
        if (! (usernameValid && emailValid && passwordValid && passwordConfirmValid && agreementValid) ) {
            event.preventDefault();
        }
    });
}

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        initPage();
    }
});