import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { doc, updateDoc, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from './Navbar';
import TemplateSelector from './TemplateSelector';
import PlayfulEditor from './editors/PlayfulEditor';
import AccountSettings from './AccountSettings';
import { templates } from '../data/templates';

export default function Profile() {
    const { user, updateProfile, refreshUser } = useAuth();
    const { t, language } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [currentTemplate, setCurrentTemplate] = useState(user?.template || 'minimal');
    const [copied, setCopied] = useState(false);

    // Real-time stats fetched directly from Firestore
    const [realStats, setRealStats] = useState({ profileViews: 0, followersCount: 0 });

    // Listen to real-time stats directly from Firestore (bypass AuthContext)
    useEffect(() => {
        if (!user?.id) return;

        const unsubscribe = onSnapshot(doc(db, 'users', user.id), (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setRealStats({
                    profileViews: data.profileViews || data.views || 0,
                    followersCount: data.followersCount || 0
                });
            }
        });

        return () => unsubscribe();
    }, [user?.id]);

    // Sync template when user data loads/changes
    useEffect(() => {
        if (user?.template) {
            setCurrentTemplate(user.template);
        }
    }, [user?.template]);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        username: user?.username || '',
        bio: user?.bio || '',
        location: user?.location || '',
        website: user?.website || '',
        avatar: user?.avatar || ''
    });

    // Sync form data when user changescd
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                username: user.username || '',
                bio: user.bio || '',
                location: user.location || '',
                website: user.website || '',
                avatar: user.avatar || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        let { name, value } = e.target;
        // Username formatting: lowercase, no spaces, only alphanumeric and underscore
        if (name === 'username') {
            value = value.toLowerCase().replace(/[^a-z0-9_]/g, '');
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const checkUsernameAvailable = async (username) => {
        if (!username || username.length < 3) return false;
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username.toLowerCase()));
        const querySnapshot = await getDocs(q);
        // Available if no results or only result is current user
        return querySnapshot.empty || (querySnapshot.size === 1 && querySnapshot.docs[0].id === user?.id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Check username availability if changed
            if (formData.username && formData.username !== user?.username) {
                const available = await checkUsernameAvailable(formData.username);
                if (!available) {
                    setError(language === 'tr' ? 'Bu kullanıcı adı zaten alınmış' : 'This username is already taken');
                    setLoading(false);
                    return;
                }
            }

            // Update profile with username
            await updateDoc(doc(db, 'users', user.id), {
                name: formData.name,
                username: formData.username?.toLowerCase() || '',
                bio: formData.bio,
                location: formData.location,
                website: formData.website,
                avatar: formData.avatar
            });

            setSuccess(t('profileUpdated'));
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleTemplateSelect = async (templateId) => {
        try {
            setCurrentTemplate(templateId);
            if (user?.id) {
                await updateDoc(doc(db, 'users', user.id), {
                    template: templateId
                });
                setSuccess(language === 'tr' ? 'Şablon güncellendi!' : 'Template updated!');
            }
        } catch (err) {
            console.error('Template update error:', err);
            setError(language === 'tr' ? 'Şablon güncellenemedi' : 'Failed to update template');
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            username: user?.username || '',
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

    const currentTemplateData = templates.find(t => t.id === currentTemplate) || templates[0];

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long' })
        : '';

    const profileUrl = user?.username ? `${window.location.origin}/${user.username}` : null;

    const copyProfileLink = () => {
        if (profileUrl) {
            navigator.clipboard.writeText(profileUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Share Link Banner */}
                {user?.username && (
                    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">link</span>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {language === 'tr' ? 'Profil Linkiniz' : 'Your Profile Link'}
                                </p>
                                <p className="font-semibold text-primary">{profileUrl}</p>
                            </div>
                        </div>
                        <button
                            onClick={copyProfileLink}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${copied
                                ? 'bg-green-500 text-white'
                                : 'bg-primary text-white hover:bg-primary/90'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">
                                {copied ? 'check' : 'content_copy'}
                            </span>
                            {copied
                                ? (language === 'tr' ? 'Kopyalandı!' : 'Copied!')
                                : (language === 'tr' ? 'Linki Kopyala' : 'Copy Link')
                            }
                        </button>
                    </div>
                )}

                {/* No username warning */}
                {!user?.username && (
                    <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-amber-800 dark:text-amber-200">
                                {language === 'tr' ? 'Kullanıcı adı belirlemediniz!' : 'No username set!'}
                            </p>
                            <p className="text-sm text-amber-600 dark:text-amber-400">
                                {language === 'tr'
                                    ? 'Profilinizi paylaşmak için bir kullanıcı adı oluşturun.'
                                    : 'Create a username to share your profile.'}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="px-4 py-2 rounded-xl bg-amber-600 text-white font-medium text-sm hover:bg-amber-700 transition-colors"
                        >
                            {language === 'tr' ? 'Oluştur' : 'Create'}
                        </button>
                    </div>
                )}

                {/* Profile Header */}
                <div className="relative rounded-3xl overflow-hidden mb-8">
                    {/* Cover */}
                    <div className="h-40 md:h-52 bg-gradient-to-r from-primary via-purple-500 to-blue-500"></div>

                    {/* Profile Info */}
                    <div className="relative bg-white dark:bg-slate-800 px-6 pb-6 pt-16 md:pt-20 border border-slate-200 dark:border-slate-700 border-t-0 rounded-b-3xl">
                        {/* Avatar */}
                        <div className="absolute -top-12 md:-top-16 left-6 md:left-8">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-3xl md:text-4xl font-bold text-white border-4 border-white dark:border-slate-800 shadow-xl">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
                                ) : (
                                    getInitials(user?.name)
                                )}
                            </div>
                        </div>

                        {/* Edit Button */}
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={() => setShowSettings(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                            >
                                <span className="material-symbols-outlined text-lg">manage_accounts</span>
                                {language === 'tr' ? 'Ayarlar' : 'Settings'}
                            </button>
                            <button
                                onClick={() => setShowTemplates(!showTemplates)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                            >
                                <span className="material-symbols-outlined text-lg">palette</span>
                                {language === 'tr' ? 'Şablon' : 'Template'}
                            </button>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20"
                                >
                                    <span className="material-symbols-outlined text-lg">edit</span>
                                    {language === 'tr' ? 'İçerik Düzenle' : 'Edit Content'}
                                </button>
                            )}
                        </div>

                        {/* Name & Info */}
                        <div className="mt-4">
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                                {user?.name || t('user')}
                            </h1>
                            {user?.username && (
                                <p className="text-primary font-medium mb-2">@{user.username}</p>
                            )}
                            <p className="text-slate-500 dark:text-slate-400 mb-4">{user?.email}</p>

                            {user?.bio && (
                                <p className="text-slate-600 dark:text-slate-300 max-w-xl mb-4">{user.bio}</p>
                            )}

                            <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                                {user?.location && (
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-lg text-primary">location_on</span>
                                        {user.location}
                                    </div>
                                )}
                                {user?.website && (
                                    <a
                                        href={user.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg text-primary">language</span>
                                        {user.website.replace(/^https?:\/\//, '')}
                                    </a>
                                )}
                                {memberSince && (
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-lg text-primary">calendar_month</span>
                                        {memberSince}{t('memberSince')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Template Selector */}
                {showTemplates && (
                    <div className="mb-8 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {language === 'tr' ? 'Şablon Seç' : 'Choose Template'}
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    {language === 'tr' ? 'Aktif: ' : 'Active: '}{currentTemplateData.name}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowTemplates(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <TemplateSelector
                            currentTemplate={currentTemplate}
                            onSelect={handleTemplateSelect}
                            user={user}
                        />
                    </div>
                )}


                {/* Success/Error Messages */}
                {success && (
                    <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        {success}
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">error</span>
                        {error}
                    </div>
                )}

                {/* Edit Form */}
                {isEditing && (
                    <>
                        {currentTemplate === 'playful' && <PlayfulEditor onClose={() => setIsEditing(false)} />}
                        {currentTemplate !== 'playful' && (
                            <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                {/* Default Editor content fallback */}
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('editProfileTitle')}</h2>
                                <p className="text-slate-500 mb-4">Please use "Settings" to edit your profile info, or select a theme to edit theme content.</p>
                                <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-slate-200 rounded-lg">Close</button>
                            </div>
                        )}
                    </>
                )}

                {/* Account Settings Modal */}
                {showSettings && <AccountSettings onClose={() => setShowSettings(false)} />}
            </main>
        </div>
    );
}
