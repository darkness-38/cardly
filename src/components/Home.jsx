import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
    const { isAuthenticated } = useAuth();
    const { t, language, toggleLanguage } = useLanguage();

    return (
        <div className="flex min-h-screen flex-col">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
                            <span className="material-symbols-outlined">space_dashboard</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Cardly</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="#features">{t('features')}</a>
                        <a className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="#templates">{t('templates')}</a>
                    </nav>
                    <div className="flex items-center gap-3">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex h-9 items-center justify-center rounded-lg px-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
                        >
                            {language === 'tr' ? '🇬🇧 EN' : '🇹🇷 TR'}
                        </button>

                        {isAuthenticated ? (
                            <Link to="/dashboard" className="flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5">
                                {t('dashboard')}
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="hidden sm:flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors">
                                    {t('login')}
                                </Link>
                                <Link to="/register" className="flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5">
                                    {t('getStarted')}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
                    {/* Decorative background blobs */}
                    <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-200/50 dark:bg-purple-900/20 blur-3xl filter opacity-60"></div>
                    <div className="absolute top-1/2 right-0 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-blue-200/50 dark:bg-primary/10 blur-3xl filter opacity-60"></div>

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="max-w-4xl text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl mb-6">
                                {t('heroTitle1')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{t('heroTitle2')}</span>
                            </h1>
                            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
                                {t('heroDescription')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-20">
                                <Link to="/register" className="flex h-12 min-w-[160px] items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-white shadow-xl shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-1">
                                    {t('startFree')}
                                </Link>
                            </div>

                            {/* Live Mobile Preview */}
                            <div className="relative mx-auto w-full max-w-[340px]">
                                {/* Phone Frame */}
                                <div className="relative z-20 overflow-hidden rounded-[2.5rem] border-[8px] border-slate-900 bg-white dark:bg-slate-900 shadow-2xl">
                                    {/* Notch/Status Bar Area */}
                                    <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 z-30 flex justify-center">
                                        <div className="h-4 w-32 bg-black rounded-b-xl"></div>
                                    </div>
                                    {/* Screen Content */}
                                    <div className="h-[600px] w-full overflow-y-auto no-scrollbar bg-slate-50 dark:bg-slate-900 flex flex-col">
                                        {/* User Header Image */}
                                        <div className="h-32 w-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                        {/* Profile Info */}
                                        <div className="px-6 relative flex flex-col items-center -mt-12 mb-6">
                                            <div className="h-24 w-24 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden bg-slate-200 shadow-md flex items-center justify-center text-3xl">
                                                👤
                                            </div>
                                            <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">{t('sampleUser')}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('userTitle')}</p>
                                        </div>
                                        {/* Links Stack */}
                                        <div className="px-4 flex flex-col gap-3 pb-8">
                                            <a className="group flex w-full items-center justify-between rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md hover:border-primary/50" href="#">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                                        <span className="material-symbols-outlined text-lg">play_arrow</span>
                                                    </div>
                                                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{t('latestVideo')}</span>
                                                </div>
                                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">chevron_right</span>
                                            </a>
                                            <a className="group flex w-full items-center justify-between rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md hover:border-primary/50" href="#">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                        <span className="material-symbols-outlined text-lg">work</span>
                                                    </div>
                                                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{t('portfolio')}</span>
                                                </div>
                                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">chevron_right</span>
                                            </a>
                                            <a className="group flex w-full items-center justify-between rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md hover:border-primary/50" href="#">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                                        <span className="material-symbols-outlined text-lg">shopping_bag</span>
                                                    </div>
                                                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{t('shop')}</span>
                                                </div>
                                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">chevron_right</span>
                                            </a>
                                            <a className="group flex w-full items-center justify-between rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md hover:border-primary/50" href="#">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                                        <span className="material-symbols-outlined text-lg">mail</span>
                                                    </div>
                                                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{t('newsletter')}</span>
                                                </div>
                                                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">chevron_right</span>
                                            </a>
                                        </div>
                                        {/* Social Icons */}
                                        <div className="mt-auto pb-8 flex justify-center gap-4">
                                            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                                            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                                            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* Phone Shadow/Glow */}
                                <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-b from-primary/20 to-purple-500/20 blur-2xl -z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Section */}
                <section id="features" className="py-20 bg-white dark:bg-slate-900/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">{t('coreFeatures')}</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">{t('featuresDescription')}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800/50 p-8 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">palette</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('customizable')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {t('customizableDesc')}
                                </p>
                            </div>
                            {/* Feature 2 */}
                            <div className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800/50 p-8 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">bar_chart</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('analytics')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {t('analyticsDesc')}
                                </p>
                            </div>
                            {/* Feature 3 */}
                            <div className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-800/50 p-8 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-primary/30">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">bolt</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('fast')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {t('fastDesc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10"></div>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="rounded-3xl bg-white dark:bg-slate-800 p-8 md:p-16 text-center shadow-xl border border-slate-100 dark:border-slate-700">
                            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl mb-6">
                                {t('readyToLaunch')}
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300 mb-10">
                                {t('ctaDescription')}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/register" className="flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-1">
                                    {t('startFree')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark pt-16 pb-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
                                <span className="material-symbols-outlined">space_dashboard</span>
                            </div>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">Cardly</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            <a className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors" href="#">{t('privacyPolicy')}</a>
                            <a className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors" href="#">{t('termsOfService')}</a>
                            <a className="text-sm text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors" href="#">{t('support')}</a>
                        </div>
                        <p className="text-sm text-slate-400 dark:text-slate-500">{t('copyright')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
