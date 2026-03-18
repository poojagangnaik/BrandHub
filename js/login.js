/* ============================================================
   LOGIN.JS  –  Login + Signup only
   localStorage keys:
     ecom_accounts       → { "username": "password", ... }
     ecom_username_hist  → ["user1", "user2", ...]  (up to 8)
     user                → active session (read by homepage.js)
============================================================ */

/* ── Store ── */
const store = {
    getAccounts:   ()    => JSON.parse(localStorage.getItem('ecom_accounts') || '{}'),
    setAccounts:   (obj) => localStorage.setItem('ecom_accounts', JSON.stringify(obj)),
    getHistory:    ()    => JSON.parse(localStorage.getItem('ecom_username_hist') || '[]'),
    setHistory:    (arr) => localStorage.setItem('ecom_username_hist', JSON.stringify(arr)),
    getSession:    ()    => localStorage.getItem('user'),
    setSession:    (u)   => localStorage.setItem('user', u),

    exists:  (u) => !!store.getAccounts()[u],
    getPass: (u) => store.getAccounts()[u] || null,
    save:    (u, p) => {
        const all = store.getAccounts();
        all[u] = p;
        store.setAccounts(all);
    },
};

/* ── History ── */
function addToHistory(username) {
    const hist = store.getHistory().filter(u => u !== username);
    hist.unshift(username);
    store.setHistory(hist.slice(0, 8));
}

function removeFromHistory(username) {
    store.setHistory(store.getHistory().filter(u => u !== username));
    renderChips();
}
window.removeFromHistory = removeFromHistory;

/* ── Panel switching ── */
const track = () => document.getElementById('panelsTrack');

function showSignup() {
    track().classList.add('show-signup');
    hideAlerts('signup-error', 'signup-success');
}
function showLogin() {
    track().classList.remove('show-signup');
    hideAlerts('login-error', 'login-success');
}
window.showSignup = showSignup;
window.showLogin  = showLogin;

/* ── Alerts ── */
function showAlert(id, type, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('alert-error', 'alert-success', 'show');
    void el.offsetWidth;
    el.classList.add(type === 'error' ? 'alert-error' : 'alert-success', 'show');
    if (msg) { const s = el.querySelector('span'); if (s) s.textContent = msg; }
}
function hideAlerts(...ids) {
    ids.forEach(id => { const el = document.getElementById(id); if (el) el.classList.remove('show'); });
}

/* ── Eye toggle ── */
function toggleEye(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.querySelector('i').className = show ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
}
window.toggleEye = toggleEye;

/* ── XSS helper ── */
function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
                    .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

/* ── Saved account chips ── */
function renderChips() {
    const hist  = store.getHistory();
    const chips = document.getElementById('login-hist-chips');
    const sec   = document.getElementById('login-hist-section');
    if (!chips || !sec) return;

    sec.style.display = hist.length ? 'block' : 'none';
    chips.innerHTML = hist.map(u => `
        <span class="chip" onclick="fillLogin('${esc(u)}')">
            <i class="fa-regular fa-user" style="font-size:11px;"></i>
            ${esc(u)}
            <button class="chip-x" title="Remove" onclick="event.stopPropagation();removeFromHistory('${esc(u)}')">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </span>`).join('');
}

function fillLogin(name) {
    const el = document.getElementById('login-user');
    if (el) { el.value = name; el.focus(); }
}
window.fillLogin = fillLogin;

/* ================================================================
   SIGNUP
================================================================ */
function handleSignup() {
    hideAlerts('signup-error', 'signup-success');

    const username = document.getElementById('signup-user').value.trim();
    const password = document.getElementById('signup-pass').value;
    const confirm  = document.getElementById('signup-confirm').value;

    if (!username || !password || !confirm) {
        return showAlert('signup-error', 'error', 'Please fill in all fields.');
    }
    if (username.length < 3) {
        return showAlert('signup-error', 'error', 'Username must be at least 3 characters.');
    }
    if (password.length < 4) {
        return showAlert('signup-error', 'error', 'Password must be at least 4 characters.');
    }
    if (password !== confirm) {
        return showAlert('signup-error', 'error', 'Passwords do not match.');
    }
    if (store.exists(username)) {
        return showAlert('signup-error', 'error', `"${username}" is already taken. Try another.`);
    }

    store.save(username, password);
    addToHistory(username);
    renderChips();

    showAlert('signup-success', 'success', `Account "${username}" created! Taking you to login…`);

    setTimeout(() => {
        // clear signup fields
        ['signup-user', 'signup-pass', 'signup-confirm'].forEach(id => {
            document.getElementById(id).value = '';
        });
        // pre-fill login username
        const lu = document.getElementById('login-user');
        if (lu) lu.value = username;

        showLogin();
    }, 1500);
}
window.handleSignup = handleSignup;

/* ================================================================
   LOGIN
================================================================ */
function handleLogin() {
    hideAlerts('login-error', 'login-success');

    const username = document.getElementById('login-user').value.trim();
    const password = document.getElementById('login-pass').value;

    if (!username || !password) {
        return showAlert('login-error', 'error', 'Please enter your username and password.');
    }

    const stored = store.getPass(username);

    if (stored === null) {
        return showAlert('login-error', 'error',
            `No account found for "${username}". Create one first.`);
    }
    if (stored !== password) {
        return showAlert('login-error', 'error', 'Incorrect password. Please try again.');
    }

    store.setSession(username);
    addToHistory(username);
    showAlert('login-success', 'success', `Welcome back, ${username}! Redirecting…`);

    setTimeout(() => { window.location.href = '../views/home.html'; }, 1200);
}
window.handleLogin = handleLogin;

/* ── Enter key ── */
document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const isSignup = track().classList.contains('show-signup');
    isSignup ? handleSignup() : handleLogin();
});

/* ── Init ── */
renderChips();
console.log('Login.js loaded ✅');

/* ── Navbar session check (runs on every page that loads login.js) ── */
(function initNavbar() {
    const user       = store.getSession();
    const loginBtn   = document.getElementById('loginBtn');
    const userDisplay= document.getElementById('userDisplay');
    const logoutBtn  = document.getElementById('logoutBtn');

    if (user) {
        if (loginBtn)    loginBtn.style.display    = 'none';
        if (userDisplay) userDisplay.style.display = 'flex';
        if (logoutBtn)   logoutBtn.style.display   = 'flex';
    } else {
        if (loginBtn)    loginBtn.style.display    = 'flex';
        if (userDisplay) userDisplay.style.display = 'none';
        if (logoutBtn)   logoutBtn.style.display   = 'none';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            store.clearSession();
            window.location.href = '../views/login.html';
        });
    }
})();