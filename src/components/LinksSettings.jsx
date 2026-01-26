import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function LinksSettings({ onClose }) {
    const { user, updateProfile } = useAuth();
    const { language } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [links, setLinks] = useState(user?.links || []);

    // Form for new/editing link
    const [editingId, setEditingId] = useState(null);
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
        { id: 'smart_display', label: 'YouTube' },
        { id: 'graphic_eq', label: 'TikTok' },
        { id: 'podcasts', label: 'Podcast' },
        { id: 'alternate_email', label: 'Contact' },
        { id: 'description', label: 'Resume' },
    ];

    useEffect(() => {
        if (user?.links) {
            setLinks(user.links);
        }
    }, [user?.links]);

    const handleAddLink = () => {
        if (!newLink.title || !newLink.url) return;

        const updatedLinks = [...links, { ...newLink, id: Date.now() }];
        setLinks(updatedLinks);
        setNewLink({ title: '', url: '', icon: 'link' });
    };

    const handleUpdateLink = () => {
        if (!newLink.title || !newLink.url) return;

        const updatedLinks = links.map(link =>
            link.id === editingId ? { ...newLink, id: editingId } : link
        );
        setLinks(updatedLinks);
        setEditingId(null);
        setNewLink({ title: '', url: '', icon: 'link' });
    };

    const startEdit = (link) => {
        setEditingId(link.id);
        setNewLink({ title: link.title, url: link.url, icon: link.icon || 'link' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setNewLink({ title: '', url: '', icon: 'link' });
    };

    const removeLink = (id) => {
        setLinks(prev => prev.filter(link => link.id !== id));
    };

    const moveLink = (index, direction) => {
        const newLinks = [...links];
        const newIndex = index + direction;
        if (newIndex >= 0 && newIndex < newLinks.length) {
            [newLinks[index], newLinks[newIndex]] = [newLinks[newIndex], newLinks[index]];
            setLinks(newLinks);
        }
    };

    const saveChanges = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await updateDoc(doc(db, 'users', user.id), {
                links: links
            });

            // Optimistically update context if needed, though useAuth usually listens to Firestore
            // But updateProfile in AuthContext handles local state update too if we passed updates.
            // Here we used direct updateDoc, so we rely on onSnapshot in AuthProvider or manual update.
            // Actually AuthProvider uses onSnapshot so it should be auto.

            setSuccess(language === 'tr' ? 'Linkler güncellendi!' : 'Links updated!');
            setTimeout(() => {
                onClose?.(); // Optional close
            }, 1000);
        } catch (err) {
            console.error(err);
            setError(language === 'tr' ? 'Bir hata oluştu' : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10 shrink-0">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-purple-500">link</span>
                        {language === 'tr' ? 'Linkleri Düzenle' : 'Edit Links'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
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

                    {/* Add/Edit Form */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 mb-6 space-y-4">
                        <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                            {editingId ? (language === 'tr' ? 'Linki Düzenle' : 'Edit Link') : (language === 'tr' ? 'Yeni Link Ekle' : 'Add New Link')}
                        </h3>

                        <div className="flex gap-3">
                            <div className="w-1/3">
                                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Icon</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">{newLink.icon}</span>
                                    <select
                                        value={newLink.icon}
                                        onChange={(e) => setNewLink(prev => ({ ...prev, icon: e.target.value }))}
                                        className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 appearance-none pointer-events-auto"
                                    >
                                        {iconOptions.map(opt => (
                                            <option key={opt.id} value={opt.id}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">Title</label>
                                <input
                                    type="text"
                                    value={newLink.title}
                                    onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Check out my work"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">URL</label>
                            <input
                                type="url"
                                value={newLink.url}
                                onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                                placeholder="https://..."
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            {editingId && (
                                <button
                                    onClick={cancelEdit}
                                    className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-medium"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                onClick={editingId ? handleUpdateLink : handleAddLink}
                                disabled={!newLink.title || !newLink.url}
                                className="px-6 py-2 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/20"
                            >
                                {editingId ? (language === 'tr' ? 'Güncelle' : 'Update') : (language === 'tr' ? 'Ekle' : 'Add')}
                            </button>
                        </div>
                    </div>

                    {/* Links List */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            {language === 'tr' ? 'Linkleriniz' : 'Your Links'}
                            <span className="ml-2 text-xs font-normal text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{links.length}</span>
                        </h3>

                        {links.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                                <span className="material-symbols-outlined text-4xl text-slate-300 block mb-2">link_off</span>
                                <p className="text-slate-500">{language === 'tr' ? 'Henüz link eklenmemiş' : 'No links added yet'}</p>
                            </div>
                        ) : (
                            links.map((link, index) => (
                                <div key={link.id || index} className="group flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                                        <span className="material-symbols-outlined">{link.icon || 'link'}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-slate-900 dark:text-white truncate">{link.title}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{link.url}</p>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => moveLink(index, -1)}
                                            disabled={index === 0}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                                        >
                                            <span className="material-symbols-outlined text-lg">arrow_upward</span>
                                        </button>
                                        <button
                                            onClick={() => moveLink(index, 1)}
                                            disabled={index === links.length - 1}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                                        >
                                            <span className="material-symbols-outlined text-lg">arrow_downward</span>
                                        </button>
                                        <button
                                            onClick={() => startEdit(link)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500"
                                        >
                                            <span className="material-symbols-outlined text-lg">edit</span>
                                        </button>
                                        <button
                                            onClick={() => removeLink(link.id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 shrink-0 rounded-b-3xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        {language === 'tr' ? 'Kapat' : 'Close'}
                    </button>
                    <button
                        onClick={saveChanges}
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-lg">save</span>
                                {language === 'tr' ? 'Kaydet' : 'Save Links'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
