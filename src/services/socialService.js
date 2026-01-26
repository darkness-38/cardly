import { db } from '../firebase';
import { doc, getDoc, setDoc, deleteDoc, runTransaction, serverTimestamp, updateDoc, increment } from 'firebase/firestore';

export const socialService = {
    // Increment profile views
    incrementProfileViews: async (userId) => {
        if (!userId) return;
        const userRef = doc(db, 'users', userId);
        try {
            await updateDoc(userRef, {
                profileViews: increment(1)
            });
        } catch (error) {
            console.error('Error incrementing views:', error);
        }
    },

    // Follow a user
    followUser: async (currentUserId, targetUserId) => {
        if (!currentUserId || !targetUserId || currentUserId === targetUserId) return;

        const relationshipId = `${currentUserId}_${targetUserId}`;
        const relationshipRef = doc(db, 'relationships', relationshipId);
        const currentUserRef = doc(db, 'users', currentUserId);
        const targetUserRef = doc(db, 'users', targetUserId);

        try {
            await runTransaction(db, async (transaction) => {
                // READS FIRST
                const relationshipDoc = await transaction.get(relationshipRef);
                const currentUserDoc = await transaction.get(currentUserRef);
                const targetUserDoc = await transaction.get(targetUserRef);

                // LOGIC CHECKS
                if (relationshipDoc.exists()) {
                    throw new Error('Already following');
                }

                if (!currentUserDoc.exists() || !targetUserDoc.exists()) {
                    throw new Error('User not found');
                }

                // WRITES
                // Create relationship
                transaction.set(relationshipRef, {
                    followerId: currentUserId,
                    followingId: targetUserId,
                    createdAt: serverTimestamp()
                });

                // Update counts
                const newFollowingCount = (currentUserDoc.data().followingCount || 0) + 1;
                const newFollowersCount = (targetUserDoc.data().followersCount || 0) + 1;

                transaction.update(currentUserRef, { followingCount: newFollowingCount });
                transaction.update(targetUserRef, { followersCount: newFollowersCount });
            });
            return true;
        } catch (error) {
            console.error('Error following user:', error);
            throw error;
        }
    },

    // Unfollow a user
    unfollowUser: async (currentUserId, targetUserId) => {
        if (!currentUserId || !targetUserId) return;

        const relationshipId = `${currentUserId}_${targetUserId}`;
        const relationshipRef = doc(db, 'relationships', relationshipId);
        const currentUserRef = doc(db, 'users', currentUserId);
        const targetUserRef = doc(db, 'users', targetUserId);

        try {
            await runTransaction(db, async (transaction) => {
                // READS
                const relationshipDoc = await transaction.get(relationshipRef);
                const currentUserDoc = await transaction.get(currentUserRef);
                const targetUserDoc = await transaction.get(targetUserRef);

                // CHECKS
                if (!relationshipDoc.exists()) {
                    throw new Error('Not following');
                }

                // WRITES
                // Delete relationship
                transaction.delete(relationshipRef);

                // Update counts
                if (currentUserDoc.exists()) {
                    const newFollowingCount = Math.max(0, (currentUserDoc.data().followingCount || 0) - 1);
                    transaction.update(currentUserRef, { followingCount: newFollowingCount });
                }

                if (targetUserDoc.exists()) {
                    const newFollowersCount = Math.max(0, (targetUserDoc.data().followersCount || 0) - 1);
                    transaction.update(targetUserRef, { followersCount: newFollowersCount });
                }
            });
            return true;
        } catch (error) {
            console.error('Error unfollowing user:', error);
            throw error;
        }
    },

    // Check if following
    checkIsFollowing: async (currentUserId, targetUserId) => {
        if (!currentUserId || !targetUserId) return false;
        const relationshipId = `${currentUserId}_${targetUserId}`;
        const docRef = doc(db, 'relationships', relationshipId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    }
};
