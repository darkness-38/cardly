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
        name: user?.name || '',
        username: user?.username || '',
        bio: user?.bio || '',
        location: user?.location || '',
        website: user?.website || '',
        avatar: user?.avatar || '',
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
                name: formData.name,
                username: formData.username?.toLowerCase() || '',
                bio: formData.bio,
                location: formData.location,
                website: formData.website,
                avatar: formData.avatar,
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
                {/* Avatar Section */}
                <div className="p-4 rounded-xl bg-[#bfbfbf] dark:bg-[#191919] shadow-[inset_3px_3px_6px_#969696,inset_-3px_-3px_6px_#dadada] dark:shadow-[inset_3px_3px_6px_#000000,inset_-3px_-3px_6px_#262626]">
                    <h3 className="font-semibold text-[#2d2d2d] dark:text-[#e5e5e5] mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined">face</span>
                        {language === 'tr' ? 'Avatar' : 'Avatar'}
                    </h3>
                    <div className="flex items-start gap-4">
                        <div className="w-20 h-20 rounded-full bg-[#bfbfbf] dark:bg-[#191919] shadow-[5px_5px_10px_#969696,-5px_-5px_10px_#dadada] dark:shadow-[5px_5px_10px_#000000,-5px_-5px_10px_#262626] flex items-center justify-center text-2xl font-bold text-[#525252] border-4 border-[#bfbfbf] dark:border-[#191919] shrink-0 overflow-hidden">
                            {formData.avatar ? (
                                <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                getInitials(formData.name)
                            )}
                        </div>
                        <div className="flex-1">
                            <input
                                type="url"
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleChange}
                                className={inputStyle}
                                placeholder="Avatar URL"
                            />
                        </div>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#525252] dark:text-[#a3a3a3] mb-2">
                            {language === 'tr' ? 'Kullanıcı Adı' : 'Username'}
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`${inputStyle} pl-8`}
                                placeholder="username"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#525252] dark:text-[#a3a3a3] mb-2">
                            {language === 'tr' ? 'İsim' : 'Name'}
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={inputStyle}
                            placeholder="Full Name"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#525252] dark:text-[#a3a3a3] mb-2">
                        {language === 'tr' ? 'Konum' : 'Location'}
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={inputStyle}
                        placeholder="City, Country"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#525252] dark:text-[#a3a3a3] mb-2">
                        {language === 'tr' ? 'Hakkında' : 'About'}
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={2}
                        className={`${inputStyle} h-auto py-3 resize-none`}
                        placeholder="Bio..."
                    />
                </div>

                {/* Links Section */}
                <div className="p-4 rounded-xl bg-[#bfbfbf] dark:bg-[#191919] shadow-[inset_3px_3px_6px_#969696,inset_-3px_-3px_6px_#dadada] dark:shadow-[inset_3px_3px_6px_#000000,inset_-3px_-3px_6px_#262626]">
                    <h3 className="font-semibold text-[#2d2d2d] dark:text-[#e5e5e5] mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined">link</span>
                        {language === 'tr' ? 'Linkler' : 'Links'}
                    </h3>

                    {/* Existing Links */}
                    <div className="space-y-3 mb-4">
                        {formData.links.map((link, index) => (
                            <div key={link.id || index} className="flex items-center gap-2 p-3 rounded-xl bg-[#bfbfbf] dark:bg-[#191919] shadow-[5px_5px_10px_#969696,-5px_-5px_10px_#dadada] dark:shadow-[5px_5px_10px_#000000,-5px_-5px_10px_#262626]">
                                <span className="material-symbols-outlined text-[#525252]">{link.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm text-[#2d2d2d] dark:text-[#e5e5e5] truncate">{link.title}</p>
                                    <p className="text-xs text-[#525252] truncate">{link.url}</p>
                                </div>
                                <div className="flex gap-1">
                                    <button type="button" onClick={() => moveLink(index, -1)} disabled={index === 0} className="w-8 h-8 rounded-full flex items-center justify-center text-[#525252] hover:bg-black/5 disabled:opacity-30">
                                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                    </button>
                                    <button type="button" onClick={() => moveLink(index, 1)} disabled={index === formData.links.length - 1} className="w-8 h-8 rounded-full flex items-center justify-center text-[#525252] hover:bg-black/5 disabled:opacity-30">
                                        <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                    </button>
                                    <button type="button" onClick={() => removeLink(link.id)} className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500/10">
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add New Link */}
                    <div className="space-y-3">
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
                                placeholder={language === 'tr' ? 'Başlık' : 'Title'}
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={newLink.url}
                                onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                                className={inputStyle}
                                placeholder="https://..."
                            />
                            <button
                                type="button"
                                onClick={addLink}
                                disabled={!newLink.title || !newLink.url}
                                className={`${buttonStyle} !px-4 !py-0 flex items-center justify-center`}
                            >
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Website */}
                <div>
                    <label className="block text-sm font-medium text-[#525252] dark:text-[#a3a3a3] mb-2">
                        {language === 'tr' ? 'Website' : 'Website'}
                    </label>
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className={inputStyle}
                        placeholder="https://mywebsite.com"
                    />
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
