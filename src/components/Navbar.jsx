import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const { t, language, toggleLanguage } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
                        <span className="material-symbols-outlined text-xl">space_dashboard</span>
                    </div>
                    <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Cardly</span>
                </Link>

                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <nav className="hidden md:flex items-center gap-1 mr-4">
                                <Link
                                    to="/dashboard"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard')
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-slate-600 hover:text-primary hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-lg">home</span>
                                    {t('dashboard')}
                                </Link>
                                <Link
                                    to="/profile"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/profile')
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-slate-600 hover:text-primary hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-lg">person</span>
                                    {t('profile')}
                                </Link>
                            </nav>

                            <div className="flex items-center gap-3">
                                {/* Language Toggle */}
                                <button
                                    onClick={toggleLanguage}
                                    className="flex h-8 items-center justify-center rounded-lg px-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
                                >
                                    {language === 'tr' ? 'EN' : 'TR'}
                                </button>

                                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                                        {user?.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            getInitials(user?.name)
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        {user?.name?.split(' ')[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex h-9 items-center gap-2 justify-center rounded-lg px-4 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 dark:text-slate-300 dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">logout</span>
                                    <span className="hidden sm:inline">{t('logout')}</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Language Toggle */}
                            <button
                                onClick={toggleLanguage}
                                className="flex h-9 items-center justify-center rounded-lg px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
                            >
                                {language === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
                            </button>

                            <Link
                                to="/login"
                                className="hidden sm:flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                            >
                                {t('login')}
                            </Link>
                            <Link
                                to="/register"
                                className="flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
                            >
                                {t('getStarted')}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
