import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import './Profile.css';

export default function Profile() {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
        location: user?.location || '',
        website: user?.website || '',
        avatar: user?.avatar || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await updateProfile(formData);
            setSuccess('Profil başarıyla güncellendi!');
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            bio: user?.bio || '',
            location: user?.location || '',
            website: user?.website || '',
            avatar: user?.avatar || ''
        });
        setIsEditing(false);
        setError('');
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })
        : '';

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile-cover"></div>

                <div className="container">
                    <div className="profile-header">
                        <div className="profile-info animate-fade-in">
                            <div className="profile-avatar">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt={user.name} />
                                ) : (
                                    getInitials(user?.name)
                                )}
                            </div>
                            <h1 className="profile-name">{user?.name || 'Kullanıcı'}</h1>
                            <p className="profile-email">{user?.email}</p>

                            {user?.bio && <p className="profile-bio">{user.bio}</p>}

                            <div className="profile-meta">
                                {user?.location && (
                                    <div className="profile-meta-item">
                                        <span>📍</span>
                                        <span>{user.location}</span>
                                    </div>
                                )}
                                {user?.website && (
                                    <div className="profile-meta-item">
                                        <span>🌐</span>
                                        <a href={user.website} target="_blank" rel="noopener noreferrer">
                                            {user.website.replace(/^https?:\/\//, '')}
                                        </a>
                                    </div>
                                )}
                                {memberSince && (
                                    <div className="profile-meta-item">
                                        <span>📅</span>
                                        <span>{memberSince} tarihinden beri üye</span>
                                    </div>
                                )}
                            </div>

                            <div className="profile-actions">
                                {!isEditing && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        ✏️ Profili Düzenle
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="profile-content">
                        {/* Stats Section */}
                        <div className="profile-stats">
                            <div className="stat-card glass-card">
                                <div className="stat-number">1</div>
                                <div className="stat-label">Profil Görüntüleme</div>
                            </div>
                            <div className="stat-card glass-card">
                                <div className="stat-number">0</div>
                                <div className="stat-label">Paylaşım</div>
                            </div>
                            <div className="stat-card glass-card">
                                <div className="stat-number">0</div>
                                <div className="stat-label">Takipçi</div>
                            </div>
                        </div>

                        {/* Edit Form */}
                        {isEditing && (
                            <div className="profile-edit-form glass-card">
                                <div className="profile-section-header">
                                    <h2 className="profile-section-title">Profil Bilgilerini Düzenle</h2>
                                </div>

                                {success && (
                                    <div className="alert alert-success">
                                        <span>✅</span> {success}
                                    </div>
                                )}

                                {error && (
                                    <div className="alert alert-error">
                                        <span>⚠️</span> {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="avatar-upload">
                                        <div className="avatar-preview">
                                            {formData.avatar ? (
                                                <img src={formData.avatar} alt="Avatar" />
                                            ) : (
                                                getInitials(formData.name)
                                            )}
                                        </div>
                                        <div className="form-group avatar-upload-btn">
                                            <label className="form-label">Avatar URL</label>
                                            <input
                                                type="url"
                                                name="avatar"
                                                className="form-input"
                                                placeholder="https://example.com/avatar.jpg"
                                                value={formData.avatar}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="profile-form-grid">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="name">Ad Soyad</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-input"
                                                placeholder="Adınız Soyadınız"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="bio">Hakkımda</label>
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                className="form-input form-textarea"
                                                placeholder="Kendinizi kısaca tanıtın..."
                                                value={formData.bio}
                                                onChange={handleChange}
                                                rows={3}
                                            />
                                        </div>

                                        <div className="profile-form-row">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="location">Konum</label>
                                                <input
                                                    type="text"
                                                    id="location"
                                                    name="location"
                                                    className="form-input"
                                                    placeholder="İstanbul, Türkiye"
                                                    value={formData.location}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label" htmlFor="website">Website</label>
                                                <input
                                                    type="url"
                                                    id="website"
                                                    name="website"
                                                    className="form-input"
                                                    placeholder="https://website.com"
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="profile-form-actions">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={handleCancel}
                                        >
                                            İptal
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? <span className="spinner"></span> : '💾 Kaydet'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
