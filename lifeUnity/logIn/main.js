const btnLogin = document.getElementById('login');
const btnSignup= document.getElementById('signup');
const headerLogin = document.getElementById('login-header');
const headerSignup = document.getElementById('signup-header');
const title = document.querySelector('title');
const btnShowPasswordLogin = document.getElementById('show-password-login');
const btnShowPasswordSignup = document.getElementById('show-password-signup');

btnSignup.addEventListener('click', () => {
    title.innerText = 'Life Unity | SignUp';
    btnLogin.classList.toggle('hidden');
    btnSignup.classList.toggle('hidden');
    headerSignup.classList.toggle('hidden');
    headerLogin.classList.toggle('hidden');
});

btnLogin.addEventListener('click', () => {
    title.innerText = 'Life Unity | LogIn';
    btnSignup.classList.toggle('hidden');
    btnLogin.classList.toggle('hidden');
    headerSignup.classList.toggle('hidden');
    headerLogin.classList.toggle('hidden');
});


btnShowPasswordLogin.addEventListener('click', (event) => {
    const passwordInput = document.getElementById('password-login');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
    event.preventDefault();
});


btnShowPasswordSignup.addEventListener('click', (event) => {
    const passwordInput = document.getElementById('password-signup');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
    event.preventDefault();
});