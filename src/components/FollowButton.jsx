import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { socialService } from '../services/socialService';
import { useNavigate } from 'react-router-dom';

export default function FollowButton({ targetUserId, className = '', onToggle }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkStatus = async () => {
            if (user && targetUserId && user.id !== targetUserId) {
                try {
                    const status = await socialService.checkIsFollowing(user.id, targetUserId);
                    setIsFollowing(status);
                } catch (error) {
                    console.error('Error checking follow status:', error);
                }
            }
            setChecking(false);
        };
        checkStatus();
    }, [user, targetUserId]);

    const handleToggleFollow = async (e) => {
        e.preventDefault(); // Prevent bubbling if inside a link
        e.stopPropagation();

        if (!user) {
            navigate('/login'); // Or show modal
            return;
        }

        if (loading) return;

        // Optimistic update
        const previousState = isFollowing;
        setIsFollowing(!previousState);
        setLoading(true);

        // Notify parent to update optimistic counts immediately
        if (onToggle) onToggle(!previousState);

        try {
            if (previousState) {
                await socialService.unfollowUser(user.id, targetUserId);
            } else {
                await socialService.followUser(user.id, targetUserId);
            }
        } catch (error) {
            // Revert on error
            setIsFollowing(previousState);
            if (onToggle) onToggle(previousState);
            console.error('Follow action failed:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user || user.id === targetUserId) return null; // Don't show for self or guests (wait, guests should see it but be redirected)

    // Actually, guests SHOULD see it to be encouraged to join.
    // So let's only hide if user.id === targetUserId
    if (user && user.id === targetUserId) return null;

    // If checking, maybe show a spinner or persistent state if we cached it? 
    // For now, render nothing or default state until checked to avoid flicker? 
    // Better to render "Follow" (default) but disabled? Or just wait.
    if (checking && user) return null; // Avoid showing wrong state

    return (
        <button
            onClick={handleToggleFollow}
            disabled={loading}
            className={`${className} transition-all active:scale-95 ${loading ? 'opacity-70 cursor-wait' : ''}`}
        >
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    );
}
