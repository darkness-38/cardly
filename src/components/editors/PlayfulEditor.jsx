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
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900">
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                        {language === 'tr'
                            ? 'Profil bilgilerinizi (isim, bio, fotoğraf vb.) "Ayarlar" menüsünden düzenleyebilirsiniz.'
                            : 'You can edit your profile info (name, bio, photo etc.) from the "Settings" menu.'}
                    </p>
                </div>

                {/* Badge Section (Avatar Input Removed) */}
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-500">verified</span>
                        {language === 'tr' ? 'Rozet / Emoji' : 'Badge / Emoji'}
                    </h3>
                    <div>
                        <div className="flex gap-2 flex-wrap">
                            {badgeOptions.map((emoji) => (
                                <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, badge: emoji }))}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${formData.badge === emoji
                                        ? 'bg-amber-500 scale-110 shadow-lg ring-2 ring-white dark:ring-slate-800'
                                        : 'bg-white dark:bg-slate-700 hover:bg-amber-100 dark:hover:bg-amber-900/50'
                                        }`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            {language === 'tr' ? 'Profil fotoğrafınızın üzerinde görünecek emojiyi seçin.' : 'Choose the emoji that will appear on your profile picture.'}
                        </p>
                    </div>
                </div>

                {/* Links Section - Floating Bubbles */}
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-500">bubble_chart</span>
                        {language === 'tr' ? 'Yüzen Baloncuklar (Linkler)' : 'Floating Bubbles (Links)'}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {language === 'tr'
                            ? 'Linklerinizi Dashboard üzerinden "Linkler" menüsünden yönetebilirsiniz. Eklediğiniz linkler burada otomatik olarak yüzen baloncuklara dönüşür.'
                            : 'You can manage your links from the "Links" menu on the Dashboard. Links you add there will automatically turn into floating bubbles here.'}
                    </p>
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
