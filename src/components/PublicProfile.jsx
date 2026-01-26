import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
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
                // Search for user by username
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('username', '==', username.toLowerCase()));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    const userData = { id: userDoc.id, ...userDoc.data() };
                    setUser(userData);

                    // Set links from user data
                    const userLinks = [];
                    if (userData.website) {
                        userLinks.push({ title: 'Website', url: userData.website });
                    }
                    setLinks(userLinks);
                } else {
                    // Try direct ID lookup as fallback
                    const userDoc = await getDoc(doc(db, 'users', username));
                    if (userDoc.exists()) {
                        const userData = { id: userDoc.id, ...userDoc.data() };
                        setUser(userData);
                        const userLinks = [];
                        if (userData.website) {
                            userLinks.push({ title: 'Website', url: userData.website });
                        }
                        setLinks(userLinks);
                    } else {
                        setError('Kullanıcı bulunamadı');
                    }
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
