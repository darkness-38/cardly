import { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile as firebaseUpdateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let firestoreUnsubscribe = null;

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firestoreUnsubscribe) {
                firestoreUnsubscribe();
                firestoreUnsubscribe = null;
            }

            if (firebaseUser) {
                // Listen to real-time updates from Firestore
                firestoreUnsubscribe = onSnapshot(doc(db, 'users', firebaseUser.uid), (docSnapshot) => {
                    const userData = docSnapshot.exists() ? docSnapshot.data() : {};
                    // console.log("Real-time Update:", userData); // Debugging

                    setUser({
                        id: firebaseUser.uid,
                        email: firebaseUser.email,
                        name: userData.name || firebaseUser.displayName || '',
                        username: userData.username || '',
                        bio: userData.bio || '',
                        avatar: userData.avatar || firebaseUser.photoURL || '',
                        location: userData.location || '',
                        website: userData.website || '',
                        template: userData.template || 'playful',
                        badge: userData.badge || '✨',
                        links: userData.links || [],
                        followersCount: userData.followersCount || 0,
                        followingCount: userData.followingCount || 0,
                        profileViews: userData.profileViews || userData.views || 0,
                        marqueeText: userData.marqueeText || 'Digital Designer /// Frontend Wizard /// Based in Tokyo',
                        createdAt: userData.createdAt || firebaseUser.metadata.creationTime
                    });
                    setLoading(false);
                }, (error) => {
                    console.error("Firestore listen error:", error);
                    setLoading(false);
                });
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => {
            if (firestoreUnsubscribe) {
                firestoreUnsubscribe();
            }
            unsubscribe();
        };
    }, []);

    const register = async (email, password, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // Update display name in Firebase Auth
            await firebaseUpdateProfile(firebaseUser, { displayName: name });

            // Create user document in Firestore
            await setDoc(doc(db, 'users', firebaseUser.uid), {
                name,
                email,
                bio: '',
                avatar: '',
                location: '',
                website: '',
                createdAt: new Date().toISOString()
            });

            return {
                id: firebaseUser.uid,
                email: firebaseUser.email,
                name
            };
        } catch (error) {
            let message = 'Kayıt sırasında bir hata oluştu';
            if (error.code === 'auth/email-already-in-use') {
                message = 'Bu e-posta adresi zaten kayıtlı';
            } else if (error.code === 'auth/weak-password') {
                message = 'Şifre çok zayıf';
            } else if (error.code === 'auth/invalid-email') {
                message = 'Geçersiz e-posta adresi';
            }
            throw new Error(message);
        }
    };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            let message = 'Giriş sırasında bir hata oluştu';
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                message = 'E-posta veya şifre hatalı';
            } else if (error.code === 'auth/too-many-requests') {
                message = 'Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin';
            }
            throw new Error(message);
        }
    };

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const firebaseUser = result.user;

            // Check if user document exists, if not create it
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    name: firebaseUser.displayName || '',
                    email: firebaseUser.email,
                    bio: '',
                    avatar: firebaseUser.photoURL || '',
                    location: '',
                    website: '',
                    createdAt: new Date().toISOString()
                });
            }

            return firebaseUser;
        } catch (error) {
            let message = 'Google ile giriş sırasında bir hata oluştu';
            if (error.code === 'auth/popup-closed-by-user') {
                message = 'Giriş penceresi kapatıldı';
            } else if (error.code === 'auth/popup-blocked') {
                message = 'Popup engellenmiş. Lütfen popup engelleyicisini devre dışı bırakın';
            }
            throw new Error(message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const updateProfile = async (updates) => {
        if (!user) {
            throw new Error('Giriş yapmanız gerekiyor');
        }

        try {
            // Update Firestore document
            await updateDoc(doc(db, 'users', user.id), {
                name: updates.name,
                username: updates.username,
                bio: updates.bio,
                location: updates.location,
                website: updates.website,
                avatar: updates.avatar
            });

            // Update Firebase Auth profile
            if (auth.currentUser) {
                await firebaseUpdateProfile(auth.currentUser, {
                    displayName: updates.name,
                    photoURL: updates.avatar
                });
            }

            // Update local state
            setUser(prev => ({
                ...prev,
                ...updates
            }));

            return { ...user, ...updates };
        } catch (error) {
            console.error('Update profile error:', error);
            throw new Error('Profil güncellenirken bir hata oluştu');
        }
    };

    const refreshUser = async () => {
        if (!user) return;
        try {
            const userDoc = await getDoc(doc(db, 'users', user.id));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUser(prev => ({
                    ...prev,
                    id: user.id, // Ensure ID is preserved
                    ...userData,
                    profileViews: userData.profileViews || userData.views || 0,
                    followersCount: userData.followersCount || 0,
                    followingCount: userData.followingCount || 0
                }));
            }
        } catch (error) {
            console.error("Manual refresh error:", error);
        }
    };

    const value = {
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
        updateProfile,
        refreshUser,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
