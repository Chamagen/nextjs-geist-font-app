// Authentication and Authorization Service
const AuthService = {
    // Login handler
    login: (username, password) => {
        const user = DataService.getUserByUsername(username);
        if (!user || user.password !== password) {
            return { success: false, message: 'Username atau password salah' };
        }

        // Create session
        const session = {
            userId: user.id,
            username: user.username,
            name: user.name,
            role: user.role,
            email: user.email,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('siapham_session', JSON.stringify(session));
        return { success: true, user: session };
    },

    // Logout handler
    logout: () => {
        localStorage.removeItem('siapham_session');
        window.location.href = 'login.html';
    },

    // Get current session
    getCurrentSession: () => {
        const session = localStorage.getItem('siapham_session');
        return session ? JSON.parse(session) : null;
    },

    // Check if user is logged in
    isLoggedIn: () => {
        return !!localStorage.getItem('siapham_session');
    },

    // Check if user has required role
    hasRole: (requiredRole) => {
        const session = AuthService.getCurrentSession();
        if (!session) return false;

        // Role hierarchy
        const roleHierarchy = {
            admin: ['admin'],
            kakanwil: ['kakanwil'],
            kabid: ['kabid'],
            petugas: ['petugas']
        };

        return roleHierarchy[requiredRole].includes(session.role);
    },

    // Protect routes based on role
    protectRoute: (allowedRoles) => {
        const session = AuthService.getCurrentSession();
        
        // If not logged in, redirect to login
        if (!session) {
            window.location.href = 'login.html';
            return false;
        }

        // If no specific roles required, allow access
        if (!allowedRoles || allowedRoles.length === 0) {
            return true;
        }

        // Check if user has any of the allowed roles
        const hasAllowedRole = allowedRoles.some(role => AuthService.hasRole(role));
        
        if (!hasAllowedRole) {
            // Redirect to appropriate dashboard based on user's role
            switch (session.role) {
                case 'admin':
                    window.location.href = 'admin.html';
                    break;
                case 'kakanwil':
                    window.location.href = 'dashboard-kakanwil.html';
                    break;
                case 'kabid':
                    window.location.href = 'dashboard-kabid.html';
                    break;
                case 'petugas':
                    window.location.href = 'dashboard-petugas.html';
                    break;
                default:
                    window.location.href = 'login.html';
            }
            return false;
        }

        return true;
    }
};

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const loginResult = AuthService.login(username, password);
    
    if (loginResult.success) {
        // Redirect based on role
        switch (loginResult.user.role) {
            case 'admin':
                window.location.href = 'admin.html';
                break;
            case 'kakanwil':
                window.location.href = 'dashboard-kakanwil.html';
                break;
            case 'kabid':
                window.location.href = 'dashboard-kabid.html';
                break;
            case 'petugas':
                window.location.href = 'dashboard-petugas.html';
                break;
            default:
                window.location.href = 'login.html';
        }
    } else {
        alert(loginResult.message);
    }
    
    return false;
}

// Check login status on protected pages
document.addEventListener('DOMContentLoaded', () => {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop();
    
    // Define protected routes and their allowed roles
    const protectedRoutes = {
        'admin.html': ['admin'],
        'dashboard-kakanwil.html': ['kakanwil'],
        'dashboard-kabid.html': ['kabid'],
        'dashboard-petugas.html': ['petugas'],
        'semua-aduan.html': ['admin', 'kakanwil', 'kabid'],
        'input-temuan.html': ['petugas'],
        'verifikasi-temuan.html': ['kabid'],
        'disposisi-sosmed.html': ['kabid'],
        'pengaturan.html': ['admin']
    };
    
    // If current page is protected, check authorization
    if (protectedRoutes[currentPage]) {
        AuthService.protectRoute(protectedRoutes[currentPage]);
    }
    
    // Add logout button handler if it exists
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            AuthService.logout();
        });
    }
    
    // Update UI with user info if logged in
    const session = AuthService.getCurrentSession();
    if (session) {
        const userNameElement = document.getElementById('userName');
        const userRoleElement = document.getElementById('userRole');
        
        if (userNameElement) {
            userNameElement.textContent = session.name;
        }
        if (userRoleElement) {
            userRoleElement.textContent = session.role.charAt(0).toUpperCase() + session.role.slice(1);
        }
    }
});
