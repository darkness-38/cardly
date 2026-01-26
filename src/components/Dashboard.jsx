import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import './Dashboard.css';

export default function Dashboard() {
    const { user } = useAuth();

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Günaydın';
        if (hour < 18) return 'İyi günler';
        return 'İyi akşamlar';
    };

    return (
        <>
            <Navbar />
            <div className="dashboard-page">
                <div className="container">
                    {/* Welcome Section */}
                    <div className="dashboard-welcome animate-fade-in">
                        <div className="welcome-avatar">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.name} />
                            ) : (
                                getInitials(user?.name)
                            )}
                        </div>
                        <div className="welcome-text">
                            <h1>{getGreeting()}, {user?.name?.split(' ')[0]}! 👋</h1>
                            <p>Cardly profilinize hoş geldiniz</p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="dashboard-section">
                        <h2 className="section-title">Hızlı Erişim</h2>
                        <div className="quick-actions">
                            <Link to="/profile" className="action-card glass-card">
                                <div className="action-icon">👤</div>
                                <div className="action-content">
                                    <h3>Profilim</h3>
                                    <p>Profil bilgilerinizi görüntüleyin ve düzenleyin</p>
                                </div>
                                <div className="action-arrow">→</div>
                            </Link>

                            <Link to="/profile" className="action-card glass-card">
                                <div className="action-icon">✏️</div>
                                <div className="action-content">
                                    <h3>Profili Düzenle</h3>
                                    <p>Bio, konum ve diğer bilgilerinizi güncelleyin</p>
                                </div>
                                <div className="action-arrow">→</div>
                            </Link>

                            <div className="action-card glass-card action-coming-soon">
                                <div className="action-icon">🔗</div>
                                <div className="action-content">
                                    <h3>Bağlantılar</h3>
                                    <p>Sosyal medya linklerinizi ekleyin</p>
                                    <span className="badge">Yakında</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="dashboard-section">
                        <h2 className="section-title">Genel Bakış</h2>
                        <div className="stats-grid">
                            <div className="stat-item glass-card">
                                <div className="stat-icon">👁️</div>
                                <div className="stat-info">
                                    <span className="stat-value">1</span>
                                    <span className="stat-label">Profil Görüntüleme</span>
                                </div>
                            </div>
                            <div className="stat-item glass-card">
                                <div className="stat-icon">📝</div>
                                <div className="stat-info">
                                    <span className="stat-value">{user?.bio ? '1' : '0'}</span>
                                    <span className="stat-label">Bio Eklendi</span>
                                </div>
                            </div>
                            <div className="stat-item glass-card">
                                <div className="stat-icon">📍</div>
                                <div className="stat-info">
                                    <span className="stat-value">{user?.location ? '✓' : '–'}</span>
                                    <span className="stat-label">Konum</span>
                                </div>
                            </div>
                            <div className="stat-item glass-card">
                                <div className="stat-icon">🌐</div>
                                <div className="stat-info">
                                    <span className="stat-value">{user?.website ? '✓' : '–'}</span>
                                    <span className="stat-label">Website</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Completion */}
                    <div className="dashboard-section">
                        <div className="completion-card glass-card">
                            <div className="completion-header">
                                <h3>Profil Tamamlama</h3>
                                <span className="completion-percent">{calculateCompletion(user)}%</span>
                            </div>
                            <div className="completion-bar">
                                <div
                                    className="completion-progress"
                                    style={{ width: `${calculateCompletion(user)}%` }}
                                ></div>
                            </div>
                            <ul className="completion-checklist">
                                <li className={user?.name ? 'completed' : ''}>
                                    {user?.name ? '✅' : '⭕'} Ad soyad ekle
                                </li>
                                <li className={user?.bio ? 'completed' : ''}>
                                    {user?.bio ? '✅' : '⭕'} Bio yaz
                                </li>
                                <li className={user?.location ? 'completed' : ''}>
                                    {user?.location ? '✅' : '⭕'} Konum ekle
                                </li>
                                <li className={user?.avatar ? 'completed' : ''}>
                                    {user?.avatar ? '✅' : '⭕'} Profil fotoğrafı ekle
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function calculateCompletion(user) {
    if (!user) return 0;
    let score = 0;
    if (user.name) score += 25;
    if (user.bio) score += 25;
    if (user.location) score += 25;
    if (user.avatar) score += 25;
    return score;
}
