import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function EarthyEditor({ onClose }) {
    const { user } = useAuth();
    const { language } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        links: user?.links || []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await updateDoc(doc(db, 'users', user.id), {
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

    return (
        <div className="p-6 md:p-8 rounded-2xl bg-[#f2efeb] dark:bg-[#221510] border border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8a9a5b]/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#8a9a5b]">eco</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#3d342f] dark:text-white">
                            {language === 'tr' ? 'Earthy Şablon Düzenle' : 'Edit Earthy Template'}
                        </h2>
                        <p className="text-sm text-stone-500">
                            {language === 'tr' ? 'Doğal ve organik tasarım' : 'Natural and organic design'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="mb-6 p-4 rounded-xl bg-[#8a9a5b]/10 border border-[#8a9a5b]/30 text-[#8a9a5b] text-sm flex items-center gap-2">
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
                {/* Info Box */}
                <div className="p-4 rounded-xl bg-[#8a9a5b]/10 border border-[#8a9a5b]/20">
                    <p className="text-sm text-[#8a9a5b]">
                        {language === 'tr'
                            ? 'Profil bilgilerinizi (isim, bio, fotoğraf vb.) "Ayarlar" menüsünden düzenleyebilirsiniz.'
                            : 'You can edit your profile info (name, bio, photo etc.) from the "Settings" menu.'}
                    </p>
                </div>

                {/* Links Section */}
                <div className="p-4 rounded-xl bg-[#ee5b2b]/5 border border-[#ee5b2b]/20">
                    <h3 className="font-semibold text-[#3d342f] dark:text-white mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#ee5b2b]">bubble_chart</span>
                        {language === 'tr' ? 'Yüzen Linkler' : 'Floating Links'}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                        {language === 'tr'
                            ? 'Linklerinizi Dashboard üzerinden "Linkler" menüsünden yönetebilirsiniz. Eklediğiniz linkler ekranın etrafında yüzen balonlar olarak görünür.'
                            : 'You can manage your links from the "Links" menu on the Dashboard. Links you add will appear as floating bubbles around the screen.'}
                    </p>
                </div>

                {/* Template Features */}
                <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
                    <h3 className="font-semibold text-[#3d342f] dark:text-white mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-stone-500">info</span>
                        {language === 'tr' ? 'Şablon Özellikleri' : 'Template Features'}
                    </h3>
                    <ul className="text-sm text-stone-600 dark:text-stone-400 space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#8a9a5b]"></span>
                            {language === 'tr' ? 'Doğal, organik renk paleti' : 'Natural, organic color palette'}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#ee5b2b]"></span>
                            {language === 'tr' ? 'Hareketli arka plan efektleri' : 'Animated background effects'}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#e6decb]"></span>
                            {language === 'tr' ? 'Dokulu görünüm (grain effect)' : 'Textured appearance (grain effect)'}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-stone-400"></span>
                            {language === 'tr' ? 'Masaüstünde yüzen link kartları' : 'Floating link cards on desktop'}
                        </li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end pt-4 border-t border-stone-200 dark:border-stone-700">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-stone-200 dark:border-stone-600 text-[#3d342f] dark:text-stone-300 font-medium hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                    >
                        {language === 'tr' ? 'İptal' : 'Cancel'}
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 rounded-xl bg-[#ee5b2b] text-white font-medium hover:bg-[#d64a1f] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
