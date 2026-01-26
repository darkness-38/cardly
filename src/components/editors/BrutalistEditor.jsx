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
        name: user?.name || '',
        username: user?.username || '',
        bio: user?.bio || '',
        location: user?.location || '',
        website: user?.website || '',
        avatar: user?.avatar || '',
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
                ...formData,
                username: formData.username?.toLowerCase() || ''
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

                {/* Avatar Section */}
                <div className="p-4 border-4 border-[#230f1c] dark:border-white bg-white dark:bg-white/5">
                    <h3 className="font-black text-[#230f1c] dark:text-white mb-4 flex items-center gap-2 uppercase tracking-tight">
                        <span className="material-symbols-outlined">face</span>
                        Identity
                    </h3>
                    <div className="flex items-start gap-4">
                        <div className="w-24 h-24 border-4 border-[#230f1c] dark:border-[#f91fb1] flex items-center justify-center text-4xl font-black bg-[#f91fb1] text-white shrink-0 overflow-hidden relative">
                            {formData.avatar ? (
                                <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover grayscale contrast-125" />
                            ) : (
                                getInitials(formData.name)
                            )}
                            <div className="absolute inset-0 ring-inset ring-4 ring-black/10"></div>
                        </div>
                        <div className="flex-1 space-y-4">
                            <input
                                type="url"
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleChange}
                                className={inputStyle}
                                placeholder="Avatar URL (automatically grayscaled)"
                            />
                        </div>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-[#230f1c] dark:text-white mb-2 uppercase">
                            Username <span className="text-[#f91fb1]">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-bold text-[#f91fb1]">@</span>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`${inputStyle} pl-10`}
                                placeholder="username"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-[#230f1c] dark:text-white mb-2 uppercase">
                            Display Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputStyle}
                            placeholder="FULL NAME"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-[#230f1c] dark:text-white mb-2 uppercase">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={inputStyle}
                        placeholder="TOKYO, JP"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-[#230f1c] dark:text-white mb-2 uppercase">
                        Bio / Intro
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={3}
                        className={`${inputStyle} h-auto py-3 resize-none`}
                        placeholder="I craft digital experiences that break the grid..."
                    />
                </div>

                {/* Links Section */}
                <div className="p-4 border-4 border-[#230f1c] dark:border-white bg-[#230f1c]/5 dark:bg-white/5">
                    <h3 className="font-black text-[#230f1c] dark:text-white mb-4 flex items-center gap-2 uppercase tracking-tight">
                        <span className="material-symbols-outlined">link</span>
                        Connection Points
                    </h3>

                    {/* Existing Links */}
                    <div className="space-y-4 mb-6">
                        {formData.links.map((link, index) => (
                            <div key={link.id || index} className="flex items-center gap-3 p-3 border-2 border-[#230f1c] dark:border-white bg-white dark:bg-[#230f1c]">
                                <span className="material-symbols-outlined text-[#f91fb1] !text-3xl">{link.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-black text-sm text-[#230f1c] dark:text-white uppercase truncate">{link.title}</p>
                                    <p className="text-xs font-mono text-gray-500 truncate">{link.url}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button type="button" onClick={() => moveLink(index, -1)} disabled={index === 0} className="w-8 h-8 flex items-center justify-center border-2 border-[#230f1c] dark:border-white hover:bg-[#230f1c] hover:text-white dark:hover:bg-white dark:hover:text-[#230f1c] disabled:opacity-30">
                                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                    </button>
                                    <button type="button" onClick={() => moveLink(index, 1)} disabled={index === formData.links.length - 1} className="w-8 h-8 flex items-center justify-center border-2 border-[#230f1c] dark:border-white hover:bg-[#230f1c] hover:text-white dark:hover:bg-white dark:hover:text-[#230f1c] disabled:opacity-30">
                                        <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                    </button>
                                    <button type="button" onClick={() => removeLink(link.id)} className="w-8 h-8 flex items-center justify-center border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add New Link */}
                    <div className="space-y-4 pt-4 border-t-4 border-[#230f1c]/10 dark:border-white/10">
                        <div className="flex gap-2">
                            <select
                                value={newLink.icon}
                                onChange={(e) => setNewLink(prev => ({ ...prev, icon: e.target.value }))}
                                className={`${inputStyle} w-1/3`}
                            >
                                {iconOptions.map((icon) => (
                                    <option key={icon.id} value={icon.id}>{icon.label}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={newLink.title}
                                onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                                className={`${inputStyle} w-2/3`}
                                placeholder="LINK TITLE"
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={newLink.url}
                                onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                                className={inputStyle}
                                placeholder="HTTPS://..."
                            />
                            <button
                                type="button"
                                onClick={addLink}
                                disabled={!newLink.title || !newLink.url}
                                className="px-4 bg-[#230f1c] dark:bg-white text-white dark:text-[#230f1c] border-2 border-transparent hover:border-[#f91fb1] disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Website */}
                <div>
                    <label className="block text-sm font-bold text-[#230f1c] dark:text-white mb-2 uppercase">
                        Portfolio / Main Site
                    </label>
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className={inputStyle}
                        placeholder="HTTPS://MYPORTFOLIO.COM"
                    />
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
