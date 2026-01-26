import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getTemplateComponent } from './templates';

export default function PublicProfile() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // For now, we'll use the username as the user ID
                // In a real app, you'd have a username -> userId mapping
                const userDoc = await getDoc(doc(db, 'users', username));

                if (userDoc.exists()) {
                    setUser({ id: userDoc.id, ...userDoc.data() });

                    // Fetch user links (if you have a links subcollection)
                    // For now, we'll use sample links
                    setLinks([
                        { title: 'Website', url: user?.website || '#' },
                    ].filter(l => l.url && l.url !== '#'));
                } else {
                    setError('Kullanıcı bulunamadı');
                }
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('Profil yüklenirken hata oluştu');
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUser();
        }
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-4">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">person_off</span>
                <h1 className="text-xl font-semibold text-slate-600 mb-2">{error}</h1>
                <p className="text-slate-400 text-center">Bu profil mevcut değil veya silinmiş olabilir.</p>
            </div>
        );
    }

    const templateId = user?.template || 'minimal';
    const TemplateComponent = getTemplateComponent(templateId);

    return <TemplateComponent user={user} links={links} />;
}
