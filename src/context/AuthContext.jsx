import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const register = (email, password, name) => {
        return new Promise((resolve, reject) => {
            // Get existing users
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Check if user already exists
            if (users.find(u => u.email === email)) {
                reject(new Error('Bu e-posta adresi zaten kayıtlı'));
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                email,
                password, // In production, this should be hashed
                name,
                bio: '',
                avatar: '',
                location: '',
                website: '',
                createdAt: new Date().toISOString()
            };

            // Save to users list
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Log in the user
            const { password: _, ...userWithoutPassword } = newUser;
            setUser(userWithoutPassword);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

            resolve(userWithoutPassword);
        });
    };

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = users.find(u => u.email === email && u.password === password);

            if (!foundUser) {
                reject(new Error('E-posta veya şifre hatalı'));
                return;
            }

            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

            resolve(userWithoutPassword);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const updateProfile = (updates) => {
        return new Promise((resolve, reject) => {
            if (!user) {
                reject(new Error('Giriş yapmanız gerekiyor'));
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.id === user.id);

            if (userIndex === -1) {
                reject(new Error('Kullanıcı bulunamadı'));
                return;
            }

            // Update user
            const updatedUser = { ...users[userIndex], ...updates };
            users[userIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));

            // Update current session
            const { password: _, ...userWithoutPassword } = updatedUser;
            setUser(userWithoutPassword);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

            resolve(userWithoutPassword);
        });
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
