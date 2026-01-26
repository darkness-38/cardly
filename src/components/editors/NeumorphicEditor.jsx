import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function NeumorphicEditor({ onClose }) {
    const { user } = useAuth();
    const { language } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
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

    // handleChange is no longer needed for text inputs if we only have links
    // But if we have other inputs we might need it. For now, links are handled separately.

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
                links: formData.links
            });

            setSuccess(language === 'tr' ? 'Linkler güncellendi!' : 'Links updated!');
            setTimeout(() => {
                onClose?.();
            }, 1000);
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

    // Neumorphic Styles
    const containerStyle = "rounded-2xl bg-[#bfbfbf] dark:bg-[#191919] shadow-[6px_6px_12px_#969696,-6px_-6px_12px_#dadada] dark:shadow-[6px_6px_12px_#000000,-6px_-6px_12px_#262626]";
    const inputStyle = "w-full h-11 px-4 rounded-xl bg-[#bfbfbf] dark:bg-[#191919] shadow-[inset_4px_4px_8px_#969696,inset_-4px_-4px_8px_#dadada] dark:shadow-[inset_4px_4px_8px_#000000,inset_-4px_-4px_8px_#262626] border-none text-[#2d2d2d] dark:text-[#e5e5e5] placeholder-gray-500 focus:ring-0";
    const buttonStyle = "px-6 py-2.5 rounded-xl bg-[#bfbfbf] dark:bg-[#191919] shadow-[5px_5px_10px_#969696,-5px_-5px_10px_#dadada] dark:shadow-[5px_5px_10px_#000000,-5px_-5px_10px_#262626] font-medium text-[#2d2d2d] dark:text-[#e5e5e5] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[inset_3px_3px_6px_#969696,inset_-3px_-3px_6px_#dadada] dark:active:shadow-[inset_3px_3px_6px_#000000,inset_-3px_-3px_6px_#262626] transition-all disabled:opacity-50";

    return (
        <div className={`p-6 md:p-8 ${containerStyle} font-sans`}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#bfbfbf] dark:bg-[#191919] shadow-[3px_3px_6px_#969696,-3px_-3px_6px_#dadada] dark:shadow-[3px_3px_6px_#000000,-3px_-3px_6px_#262626] flex items-center justify-center text-[#2d2d2d] dark:text-[#e5e5e5]">
                        <span className="material-symbols-outlined text-lg">edit_note</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#2d2d2d] dark:text-[#e5e5e5]">
                            Neumorphism Editor
                        </h2>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-[#bfbfbf] dark:bg-[#191919] shadow-[3px_3px_6px_#969696,-3px_-3px_6px_#dadada] dark:shadow-[3px_3px_6px_#000000,-3px_-3px_6px_#262626] flex items-center justify-center text-[#525252] hover:text-red-500 transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">close</span>
                </button>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    {success}
                </div>
            )}
            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">error</span>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">


                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900">
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                        {language === 'tr'
                            ? 'Profil bilgilerinizi (isim, bio, fotoğraf vb.) "Ayarlar" menüsünden düzenleyebilirsiniz.'
                            : 'You can edit your profile info (name, bio, photo etc.) from the "Settings" menu.'}
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-[#bfbfbf] dark:bg-[#191919] shadow-[inset_3px_3px_6px_#969696,inset_-3px_-3px_6px_#dadada] dark:shadow-[inset_3px_3px_6px_#000000,inset_-3px_-3px_6px_#262626]">
                    <h3 className="font-semibold text-[#2d2d2d] dark:text-[#e5e5e5] mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined">link</span>
                        {language === 'tr' ? 'Linkler' : 'Links'}
                    </h3>
                    <p className="text-sm text-[#525252]">
                        {language === 'tr'
                            ? 'Linklerinizi Dashboard üzerinden "Linkler" menüsünden yönetebilirsiniz.'
                            : 'You can manage your links from the "Links" menu on the Dashboard.'}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end pt-4 border-t border-black/5 dark:border-white/5">
                    <button
                        type="button"
                        onClick={onClose}
                        className={buttonStyle}
                    >
                        {language === 'tr' ? 'İptal' : 'Cancel'}
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${buttonStyle} flex items-center gap-2 text-green-700 dark:text-green-400`}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-[#525252] border-t-transparent rounded-full animate-spin"></div>
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
