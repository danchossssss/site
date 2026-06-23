const PASSWORD = 'YAEBALGITHUB';
const STORAGE_KEY = 'github_secret_content';

const params = new URLSearchParams(window.location.search);
const password = params.get('password');

if (password !== PASSWORD) {
    document.body.textContent = 'Error: Invalid password';
} else {
    const content = localStorage.getItem(STORAGE_KEY);
    document.body.textContent = content || '';
}
