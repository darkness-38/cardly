import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { socialService } from '../services/socialService';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FollowButton({ targetUserId, className = '', onToggle }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
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
            // Redirect to login, but save current location to come back
            navigate('/login', { state: { from: location.pathname } });
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

    // Only hide if looking at own profile
    // if (user && user.id === targetUserId) return null; // Commented out for verification visibility

    // If logged in and checking status, wait (return null) to avoid flicker.
    // Guests are not checking (checking is effectively false or irrelevant for them).
    if (user && checking && user.id !== targetUserId) return null;

    const isSelf = user && user.id === targetUserId;

    return (
        <button
            onClick={handleToggleFollow}
            disabled={loading || isSelf} // Disable for self
            className={`${className} transition-all active:scale-95 ${loading ? 'opacity-70 cursor-wait' : ''} ${isSelf ? 'opacity-50 cursor-default' : ''}`}
        >
            {isSelf ? 'You' : (isFollowing ? 'Unfollow' : 'Follow')}
        </button>
    );
}
