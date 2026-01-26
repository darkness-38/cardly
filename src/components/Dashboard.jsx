import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Navbar from './Navbar';

export default function Dashboard() {
    const { user } = useAuth();
    const { t } = useLanguage();

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return t('goodMorning');
        if (hour < 18) return t('goodAfternoon');
        return t('goodEvening');
    };

    const calculateCompletion = () => {
        if (!user) return 0;
        let score = 0;
        if (user.name) score += 25;
        if (user.bio) score += 25;
        if (user.location) score += 25;
        if (user.avatar) score += 25;
        return score;
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-purple-500 p-8 md:p-12 mb-8">
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>

                    <div className="relative flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold text-white border border-white/30 shrink-0">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
                            ) : (
                                getInitials(user?.name)
                            )}
                        </div>
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
                            </h1>
                            <p className="text-white/80">
                                {t('welcomeToCardly')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('quickAccess')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            to="/profile"
                            className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">person</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-900 dark:text-white">{t('myProfile')}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t('viewProfile')}</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all">
                                chevron_right
                            </span>
                        </Link>

                        <Link
                            to="/profile"
                            className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">edit</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-900 dark:text-white">{t('editProfile')}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t('updateInfo')}</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all">
                                chevron_right
                            </span>
                        </Link>

                        <div className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 opacity-60">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <span className="material-symbols-outlined text-2xl">link</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-900 dark:text-white">{t('links')}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t('socialLinks')}</p>
                                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded">
                                    {t('comingSoon')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('overview')}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                                <span className="material-symbols-outlined">visibility</span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">1</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{t('views')}</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-3">
                                <span className="material-symbols-outlined">description</span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">{user?.bio ? '1' : '0'}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{t('bio')}</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3">
                                <span className="material-symbols-outlined">location_on</span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">{user?.location ? '✓' : '–'}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{t('location')}</div>
                        </div>
                        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3">
                                <span className="material-symbols-outlined">language</span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">{user?.website ? '✓' : '–'}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{t('website')}</div>
                        </div>
                    </div>
                </div>

                {/* Profile Completion */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t('profileCompletion')}</h2>
                        <span className="text-2xl font-bold text-primary">{calculateCompletion()}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-6">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${calculateCompletion()}%` }}
                        ></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className={`flex items-center gap-2 text-sm ${user?.name ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            <span className="material-symbols-outlined text-lg">
                                {user?.name ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            {t('fullNameItem')}
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${user?.bio ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            <span className="material-symbols-outlined text-lg">
                                {user?.bio ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            {t('bio')}
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${user?.location ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            <span className="material-symbols-outlined text-lg">
                                {user?.location ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            {t('location')}
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${user?.avatar ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            <span className="material-symbols-outlined text-lg">
                                {user?.avatar ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            {t('profilePhoto')}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
