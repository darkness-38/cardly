import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background-light dark:bg-background-dark relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-purple-200/50 dark:bg-purple-900/20 blur-3xl opacity-60"></div>
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-200/50 dark:bg-primary/10 blur-3xl opacity-60"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Card */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-6">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white">
                                <span className="material-symbols-outlined">space_dashboard</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Cardly</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Tekrar Hoş Geldin</h1>
                        <p className="text-slate-500 dark:text-slate-400">Hesabına giriş yap</p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">error</span>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                E-posta
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="ornek@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Şifre
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 px-4 pr-12 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                'Giriş Yap'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                        Hesabın yok mu?{' '}
                        <Link to="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                            Kayıt Ol
                        </Link>
                    </p>
                </div>

                {/* Features */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <span className="material-symbols-outlined">verified_user</span>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white text-sm">Güvenli</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">256-bit şifreleme</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <span className="material-symbols-outlined">bolt</span>
                        </div>
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white text-sm">Hızlı</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Anında erişim</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
