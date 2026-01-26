import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

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
        <div className="auth-page">
            <div className="auth-decoration auth-decoration-1"></div>
            <div className="auth-decoration auth-decoration-2"></div>

            <div className="auth-container">
                <div className="auth-card glass-card">
                    <div className="auth-header">
                        <div className="auth-logo">Cardly</div>
                        <p className="auth-subtitle">Hesabınıza giriş yapın</p>
                    </div>

                    {error && (
                        <div className="alert alert-error">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">E-posta</label>
                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                placeholder="ornek@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Şifre</label>
                            <div className="password-toggle">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className="form-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary form-submit-btn"
                            disabled={loading}
                        >
                            {loading ? <span className="spinner"></span> : 'Giriş Yap'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Hesabınız yok mu?
                        <Link to="/register">Kayıt Ol</Link>
                    </div>
                </div>

                <div className="auth-features">
                    <div className="auth-feature">
                        <div className="auth-feature-icon">✨</div>
                        <div className="auth-feature-text">
                            <h4>Kişisel Profil</h4>
                            <p>Kendinize özel profil sayfası oluşturun</p>
                        </div>
                    </div>
                    <div className="auth-feature">
                        <div className="auth-feature-icon">🔒</div>
                        <div className="auth-feature-text">
                            <h4>Güvenli</h4>
                            <p>Bilgileriniz güvende tutulur</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
