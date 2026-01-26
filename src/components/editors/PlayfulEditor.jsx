import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function PlayfulEditor({ onClose }) {
    const { user } = useAuth();
    const { language } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: user?.name || '',
        username: user?.username || '',
        bio: user?.bio || '',
        location: user?.location || '',
        website: user?.website || '',
        avatar: user?.avatar || '',
        badge: user?.badge || '✨',
        links: user?.links || []
    });

    const [newLink, setNewLink] = useState({ title: '', url: '', icon: 'link' });

    const iconOptions = [
        { id: 'palette', label: 'Portfolio' },
        { id: 'storefront', label: 'Shop' },
        { id: 'play_circle', label: 'Video' },
        { id: 'language', label: 'Website' },
        { id: 'mail', label: 'Email' },
        { id: 'photo_camera', label: 'Instagram' },
        { id: 'flutter_dash', label: 'Twitter' },
        { id: 'code', label: 'GitHub' },
        { id: 'music_note', label: 'Music' },
        { id: 'link', label: 'Link' },
    ];

    const badgeOptions = ['✨', '🎨', '🚀', '💫', '⭐', '🌟', '💎', '🔥', '❤️', '🎯'];

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'username') {
            value = value.toLowerCase().replace(/[^a-z0-9_]/g, '');
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addLink = () => {
        if (newLink.title && newLink.url) {
            setFormData(prev => ({
                ...prev,
                links: [...prev.links, { ...newLink, id: Date.now() }]
            }));
            setNewLink({ title: '', url: '', icon: 'link' });
        }
    };

    const removeLink = (id) => {
        setFormData(prev => ({
            ...prev,
            links: prev.links.filter(link => link.id !== id)
        }));
    };

    const moveLink = (index, direction) => {
        const newLinks = [...formData.links];
        const newIndex = index + direction;
        if (newIndex >= 0 && newIndex < newLinks.length) {
            [newLinks[index], newLinks[newIndex]] = [newLinks[newIndex], newLinks[index]];
            setFormData(prev => ({ ...prev, links: newLinks }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await updateDoc(doc(db, 'users', user.id), {
                name: formData.name,
                username: formData.username?.toLowerCase() || '',
                bio: formData.bio,
                location: formData.location,
                website: formData.website,
                avatar: formData.avatar,
                badge: formData.badge,
                links: formData.links
            });

            setSuccess(language === 'tr' ? 'Profil güncellendi!' : 'Profile updated!');
            setTimeout(() => {
                onClose?.();
            }, 1500);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                        <span className="text-xl">🫧</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {language === 'tr' ? 'Playful Şablon Düzenle' : 'Edit Playful Template'}
                        </h2>
                        <p className="text-sm text-slate-500">
                            {language === 'tr' ? 'Yüzen baloncuklar ve organik şekiller' : 'Floating bubbles and organic shapes'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
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

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar & Badge Section */}
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-500">face</span>
                        {language === 'tr' ? 'Avatar & Rozet' : 'Avatar & Badge'}
                    </h3>
                    <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl font-bold text-white border-4 border-amber-400 shrink-0 overflow-hidden">
                            {formData.avatar ? (
                                <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                getInitials(formData.name)
                            )}
                        </div>
                        <div className="flex-1 space-y-3">
                            <input
                                type="url"
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleChange}
                                className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="Avatar URL"
                            />
                            <div>
                                <label className="text-xs text-slate-500 mb-1 block">
                                    {language === 'tr' ? 'Rozet Emoji' : 'Badge Emoji'}
                                </label>
                                <div className="flex gap-2 flex-wrap">
                                    {badgeOptions.map((emoji) => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, badge: emoji }))}
                                            className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-all ${formData.badge === emoji
                                                ? 'bg-amber-500 scale-110 shadow-lg'
                                                : 'bg-white dark:bg-slate-700 hover:bg-amber-100'
                                                }`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {language === 'tr' ? 'Kullanıcı Adı' : 'Username'}
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">@</span>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full h-11 pl-8 pr-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="kullanici_adi"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {language === 'tr' ? 'İsim' : 'Name'}
                            <span className="text-amber-500 ml-1">(Hi, I'm ___!)</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="Alex"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {language === 'tr' ? 'Konum' : 'Location'} 📍
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Istanbul, Turkey"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {language === 'tr' ? 'Hakkında' : 'About'}
                        <span className="text-slate-400 ml-1">(Bio kutusu)</span>
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                        placeholder={language === 'tr' ? 'I create digital worlds and funny characters...' : 'I create digital worlds...'}
                    />
                </div>

                {/* Links Section - Floating Bubbles */}
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-500">bubble_chart</span>
                        {language === 'tr' ? 'Yüzen Baloncuklar (Linkler)' : 'Floating Bubbles (Links)'}
                    </h3>

                    {/* Existing Links */}
                    <div className="space-y-2 mb-4">
                        {formData.links.map((link, index) => (
                            <div key={link.id || index} className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                                <span className="material-symbols-outlined text-blue-500">{link.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm text-slate-800 dark:text-white truncate">{link.title}</p>
                                    <p className="text-xs text-slate-400 truncate">{link.url}</p>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        type="button"
                                        onClick={() => moveLink(index, -1)}
                                        disabled={index === 0}
                                        className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                                    >
                                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => moveLink(index, 1)}
                                        disabled={index === formData.links.length - 1}
                                        className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                                    >
                                        <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeLink(link.id)}
                                        className="p-1 text-red-400 hover:text-red-600"
                                    >
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                        {formData.links.length === 0 && (
                            <p className="text-sm text-slate-400 text-center py-4">
                                {language === 'tr' ? 'Henüz link eklenmemiş' : 'No links added yet'}
                            </p>
                        )}
                    </div>

                    {/* Add New Link */}
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-600/50 space-y-3">
                        <div className="flex gap-2">
                            <select
                                value={newLink.icon}
                                onChange={(e) => setNewLink(prev => ({ ...prev, icon: e.target.value }))}
                                className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                            >
                                {iconOptions.map((icon) => (
                                    <option key={icon.id} value={icon.id}>{icon.label}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={newLink.title}
                                onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                                className="flex-1 h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                                placeholder={language === 'tr' ? 'Başlık' : 'Title'}
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={newLink.url}
                                onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                                className="flex-1 h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                                placeholder="https://..."
                            />
                            <button
                                type="button"
                                onClick={addLink}
                                disabled={!newLink.title || !newLink.url}
                                className="h-10 px-4 rounded-lg bg-blue-500 text-white font-medium text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">add</span>
                                {language === 'tr' ? 'Ekle' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Website (Main CTA) */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        {language === 'tr' ? 'Ana Website' : 'Main Website'}
                        <span className="text-slate-400 ml-1">(CTA Button)</span>
                    </label>
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="https://mywebsite.com"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        {language === 'tr' ? 'İptal' : 'Cancel'}
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-lg">save</span>
                                {language === 'tr' ? 'Kaydet' : 'Save'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
