/* ============================================================
   NAVBAR.JS — drop this script on every page
   Reads the "user" session from localStorage and:
   - Hides  "Login"      when logged in
   - Shows  "My Profile" when logged in (links to profile.html)
   - Shows  "Logout"     when logged in
   - Shows  "Login"      when logged out
============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    const user        = localStorage.getItem('user');
    const loginBtn    = document.getElementById('loginBtn');
    const userDisplay = document.getElementById('userDisplay');
    const logoutBtn   = document.getElementById('logoutBtn');

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
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }

});