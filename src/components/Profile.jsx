import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from './Navbar';
import TemplateSelector from './TemplateSelector';
import { templates } from '../data/templates';

export default function Profile() {
    const { user, updateProfile } = useAuth();
    const { t, language } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [currentTemplate, setCurrentTemplate] = useState(user?.template || 'minimal');

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

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                                    {t('edit')}
                                </button>
                            )}
                        </div>

                        {/* Name & Info */}
                        <div className="mt-4">
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                                {user?.name || t('user')}
                            </h1>
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

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                        <div className="text-3xl font-bold text-primary mb-1">1</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{t('views')}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                        <div className="text-3xl font-bold text-primary mb-1">0</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{t('shares')}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                        <div className="text-3xl font-bold text-primary mb-1">0</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{t('followers')}</div>
                    </div>
                </div>

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
                    <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('editProfileTitle')}</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Avatar URL */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-xl font-bold text-white shrink-0">
                                    {formData.avatar ? (
                                        <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
                                    ) : (
                                        getInitials(formData.name)
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="avatar" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        {t('avatarUrl')}
                                    </label>
                                    <input
                                        type="url"
                                        id="avatar"
                                        name="avatar"
                                        value={formData.avatar}
                                        onChange={handleChange}
                                        className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="https://example.com/avatar.jpg"
                                    />
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    {t('fullName')}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder={t('fullName')}
                                    required
                                />
                            </div>

                            {/* Bio */}
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    {t('aboutMe')}
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                    placeholder={t('describeYourself')}
                                />
                            </div>

                            {/* Location & Website */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        {t('location')}
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="Istanbul, Turkey"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="website" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        {t('website')}
                                    </label>
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="https://website.com"
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    {t('cancel')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-lg">save</span>
                                            {t('save')}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}
