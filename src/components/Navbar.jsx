import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="navbar-logo">Cardly</span>
                </Link>

                <div className="navbar-menu">
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="navbar-link">
                                <span>🏠</span> Ana Sayfa
                            </Link>
                            <Link to="/profile" className="navbar-link">
                                <span>👤</span> Profil
                            </Link>
                            <div className="navbar-divider"></div>
                            <div className="navbar-user">
                                <div className="navbar-avatar">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt={user.name} />
                                    ) : (
                                        getInitials(user?.name)
                                    )}
                                </div>
                                <span className="navbar-username">{user?.name?.split(' ')[0]}</span>
                            </div>
                            <button className="btn btn-ghost navbar-logout" onClick={handleLogout}>
                                Çıkış
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost">
                                Giriş Yap
                            </Link>
                            <Link to="/register" className="btn btn-primary">
                                Kayıt Ol
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
