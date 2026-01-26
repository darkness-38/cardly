import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function BrutalistEditor({ onClose }) {
    const { user } = useAuth();
    const { language } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        marqueeText: user?.marqueeText || 'Digital Designer /// Frontend Wizard /// Based in Tokyo',
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
                marqueeText: formData.marqueeText,
                links: formData.links
            });

            setSuccess(language === 'tr' ? 'Profil güncellendi!' : 'Profile updated!');
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

    // Brutalist Styles
    const containerStyle = "bg-[#f8f5f7] dark:bg-[#230f1c] border-4 border-[#f91fb1]";
    const inputStyle = "w-full h-12 px-4 bg-white dark:bg-[#230f1c] border-4 border-[#230f1c] dark:border-[#f91fb1] text-[#230f1c] dark:text-white font-mono placeholder-gray-500 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_#f91fb1]";
    const buttonStyle = "px-6 py-3 bg-[#f91fb1] text-white font-black uppercase tracking-widest border-4 border-transparent hover:bg-white hover:text-[#230f1c] hover:border-[#230f1c] dark:hover:border-[#f91fb1] transition-all disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <div className={`p-6 md:p-8 ${containerStyle} font-sans`}>
            <div className="flex items-center justify-between mb-8 border-b-4 border-[#f91fb1] pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#f91fb1] text-white border-4 border-[#230f1c] dark:border-white">
                        <span className="material-symbols-outlined !text-3xl">emergency</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-[#230f1c] dark:text-[#f91fb1] uppercase tracking-tighter">
                            Brutalist Editor
                        </h2>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center border-4 border-[#230f1c] dark:border-[#f91fb1] hover:bg-[#f91fb1] hover:text-white transition-colors"
                >
                    <span className="material-symbols-outlined font-bold">close</span>
                </button>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="mb-6 p-4 bg-[#f91fb1]/10 border-4 border-[#f91fb1] text-[#f91fb1] font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    {success}
                </div>
            )}
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border-4 border-red-500 text-red-500 font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">error</span>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Marquee Text Special Input */}
                <div className="p-4 border-4 border-[#f91fb1] bg-[#f91fb1]/5">
                    <label className="block text-sm font-black text-[#f91fb1] uppercase tracking-widest mb-2">
                         /// Scrolling Marquee Text ///
                    </label>
                    <input
                        type="text"
                        name="marqueeText"
                        value={formData.marqueeText}
                        onChange={handleChange}
                        className={inputStyle}
                        placeholder="Digital Designer /// Based in Tokyo..."
                    />
                    <p className="text-xs font-mono mt-2 opacity-60 dark:text-white">The text that scrolls across the top of your profile.</p>
                </div>

                <div className="p-4 border-4 border-[#230f1c] dark:border-white">
                    <p className="font-bold text-[#230f1c] dark:text-white uppercase tracking-tight">
                        {language === 'tr' ? 'Hesap Ayarları' : 'Account Settings'}
                    </p>
                    <p className="mt-2 text-sm font-mono opacity-80 text-[#230f1c] dark:text-white">
                        {language === 'tr'
                            ? 'Profil bilgilerinizi (isim, bio, fotoğraf vb.) ana menüdeki "Ayarlar" butonundan düzenleyebilirsiniz.'
                            : 'Please update your identity info (name, bio, photo etc.) from the main "Settings" menu.'}
                    </p>
                </div>

                {/* Links Section */}
                <div className="p-4 border-4 border-[#230f1c] dark:border-white bg-[#230f1c]/5 dark:bg-white/5">
                    <h3 className="font-black text-[#230f1c] dark:text-white mb-2 flex items-center gap-2 uppercase tracking-tight">
                        <span className="material-symbols-outlined">link</span>
                        Connection Points
                    </h3>
                    <p className="text-sm font-mono text-[#230f1c] dark:text-white">
                        {language === 'tr'
                            ? 'Linklerinizi Dashboard üzerinden "Linkler" menüsünden yönetebilirsiniz.'
                            : 'You can manage your links from the "Links" menu on the Dashboard.'}
                    </p>
                </div>



                {/* Actions */}
                <div className="flex gap-4 justify-end pt-8 border-t-4 border-[#f91fb1]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 border-4 border-[#230f1c] dark:border-white text-[#230f1c] dark:text-white font-black uppercase hover:bg-[#230f1c] hover:text-white dark:hover:bg-white dark:hover:text-[#230f1c] transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={buttonStyle}
                    >
                        {loading ? 'SAVING...' : 'SAVE CHANGES'}
                    </button>
                </div>
            </form>
        </div>
    );
}
