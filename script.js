const CORRECT_PASSWORD = 'YAEBALGITHUB';
const STORAGE_KEY = 'github_secret_content';
const AUTH_KEY = 'github_secret_auth';

function getPasswordFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('password');
}

function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    
    if (password === CORRECT_PASSWORD) {
        localStorage.setItem(AUTH_KEY, 'true');
        showEditor();
        document.getElementById('loginError').classList.add('hidden');
    } else {
        document.getElementById('loginError').textContent = '❌ Неверный пароль!';
        document.getElementById('loginError').classList.remove('hidden');
    }
}

function checkURLPassword() {
    const urlPassword = getPasswordFromURL();
    if (urlPassword === CORRECT_PASSWORD) {
        localStorage.setItem(AUTH_KEY, 'true');
        showEditor();
    }
}

function showEditor() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('editorForm').classList.remove('hidden');
    loadSavedContent();
    updateRawUrl();
}

function loadSavedContent() {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
        document.getElementById('codeEditor').value = savedContent;
    }
}

function saveContent() {
    const content = document.getElementById('codeEditor').value;
    localStorage.setItem(STORAGE_KEY, content);
    
    const messageEl = document.getElementById('saveMessage');
    messageEl.textContent = '✅ Сохранено успешно!';
    messageEl.className = 'success';
    messageEl.classList.remove('hidden');
    
    updateRawUrl();
    
    setTimeout(() => {
        messageEl.classList.add('hidden');
    }, 3000);
}

function updateRawUrl() {
    const content = localStorage.getItem(STORAGE_KEY) || '';
    const baseUrl = window.location.href.split('?')[0].replace('index.html', '');
    // Кодируем контент в base64 и помещаем в хеш
    const encoded = btoa(unescape(encodeURIComponent(content)));
    const rawUrl = `${baseUrl}raw/${encoded}`;
    document.getElementById('rawUrl').textContent = rawUrl;
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('editorForm').classList.add('hidden');
    document.getElementById('passwordInput').value = '';
    
    if (window.history && window.history.pushState) {
        const newURL = window.location.pathname;
        window.history.pushState({}, '', newURL);
    }
}

function isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === 'true' || getPasswordFromURL() === CORRECT_PASSWORD;
}

window.onload = function() {
    if (isAuthenticated()) {
        showEditor();
    } else {
        document.getElementById('loginForm').classList.remove('hidden');
        checkURLPassword();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('passwordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
});
