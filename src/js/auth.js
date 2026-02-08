// Authentication Module
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.authModal = document.getElementById('loginModal');
        this.setupAuthListeners();
    }

    setupAuthListeners() {
        auth.onAuthStateChanged((user) => {
            this.currentUser = user;
            appState.currentUser = user;
            
            if (user) {
                this.showApp();
                this.updateUserInfo(user);
                this.loadUserData(user.uid);
            } else {
                this.showLogin();
            }
        });

        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        document.getElementById('signupLink').addEventListener('click', (e) => {
            e.preventDefault();
            this.showSignupForm();
        });
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => this.handleAuthError(error));
    }

    handleSignup(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name')?.value || email.split('@')[0];

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                return userCredential.user.updateProfile({ displayName: name });
            })
            .then(() => {
                this.initializeUserData(auth.currentUser.uid, name);
            })
            .catch((error) => this.handleAuthError(error));
    }

    handleAuthError(error) {
        alert(error.message);
        console.error('Auth error:', error);
    }

    logout() {
        auth.signOut().catch(console.error);
    }

    showApp() {
        this.authModal.style.display = 'none';
        document.querySelector('.app-container').style.display = 'flex';
    }

    showLogin() {
        this.authModal.style.display = 'flex';
        document.querySelector('.app-container').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    }

    showSignupForm() {
        const form = document.getElementById('loginForm');
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'name';
        nameInput.placeholder = 'Ваше имя';
        nameInput.required = true;

        form.insertBefore(nameInput, form.firstChild);
        form.querySelector('button').textContent = 'Зарегистрироваться';
        form.removeEventListener('submit', (e) => this.handleLogin(e));
        form.addEventListener('submit', (e) => this.handleSignup(e));
    }

    updateUserInfo(user) {
        const userInfo = document.getElementById('userInfo');
        if (userInfo) {
            userInfo.querySelector('.user-name').textContent = user.displayName || user.email;
        }
    }

    loadUserData(uid) {
        database.ref(`users/${uid}`).on('value', (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                console.log('User data loaded:', userData);
            }
        });
    }

    initializeUserData(uid, name) {
        database.ref(`users/${uid}`).set({
            name: name,
            email: auth.currentUser.email,
            createdAt: new Date().toISOString(),
            role: 'volunteer'
        });
    }
}

// Initialize Auth Manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.authManager = new AuthManager();
    });
} else {
    window.authManager = new AuthManager();
}
