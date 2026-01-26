// Playful Illustrative Template - Floating bubbles and organic shapes
import FollowButton from '../FollowButton';

export default function PlayfulTemplate({ user, links = [] }) {
    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const formatUrl = (link) => {
        if (!link.url) return '#';
        if (link.icon === 'mail' || (link.url.includes('@') && !link.url.startsWith('mailto:') && !link.url.startsWith('https://') && !link.url.startsWith('http://'))) {
            return `mailto:${link.url}`;
        }
        return link.url;
    };

    const bubbleColors = [
        { bg: 'bg-amber-100 dark:bg-amber-900/40', icon: 'text-amber-500' },
        { bg: 'bg-pink-100 dark:bg-pink-900/40', icon: 'text-pink-500' },
        { bg: 'bg-blue-100 dark:bg-blue-900/40', icon: 'text-blue-500' },
        { bg: 'bg-green-100 dark:bg-green-900/40', icon: 'text-green-500' },
        { bg: 'bg-purple-100 dark:bg-purple-900/40', icon: 'text-purple-500' },
        { bg: 'bg-orange-100 dark:bg-orange-900/40', icon: 'text-orange-500' },
    ];

    const blobStyles = [
        'rounded-[60%_40%_30%_70%/60%_30%_70%_40%]',
        'rounded-[53%_47%_52%_48%/36%_41%_59%_64%]',
        'rounded-[40%_60%_70%_30%/40%_50%_60%_50%]',
        'rounded-[70%_30%_30%_70%/60%_40%_60%_40%]',
    ];

    return (
        <div className="min-h-screen bg-amber-50 dark:bg-amber-950 relative overflow-hidden">
            {/* Background Pattern */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-10 dark:opacity-5"
                style={{
                    backgroundImage: 'radial-gradient(#ee9d2b 1.5px, transparent 1.5px)',
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Floating Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-200/30 dark:bg-amber-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
                {/* Avatar Section */}
                <div className="relative mb-8 group">
                    {/* Rotating dashed border */}
                    <div className="absolute -inset-4 border-2 border-dashed border-amber-400/40 rounded-full animate-spin" style={{ animationDuration: '12s' }}></div>

                    {/* Avatar */}
                    <div className={`relative w-48 h-48 md:w-56 md:h-56 bg-white dark:bg-white/10 p-2 ${blobStyles[0]} shadow-2xl transition-transform duration-500 group-hover:scale-105`}>
                        <div className={`w-full h-full ${blobStyles[0]} overflow-hidden border-4 border-amber-400 flex items-center justify-center`}>
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                    <span className="text-5xl font-bold text-white">{getInitials(user?.name)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-lg border border-amber-200 rotate-6 group-hover:rotate-0 transition-transform">
                        <span className="text-2xl">{user?.badge || '✨'}</span>
                    </div>
                </div>

                {/* Name & Bio */}
                <div className="text-center max-w-lg mx-auto mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold mb-2 tracking-tight text-slate-800 dark:text-white">
                        Hi, I'm <span className="text-amber-500 relative inline-block">
                            {user?.name?.split(' ')[0] || 'User'}!
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-400 opacity-40" preserveAspectRatio="none" viewBox="0 0 100 10">
                                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                            </svg>
                        </span>
                    </h1>

                    {user?.location && (
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium mt-4 mb-6">
                            📍 {user.location}
                        </p>
                    )}

                    {user?.bio && (
                        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/40 dark:border-white/10 shadow-sm mx-4 transform transition-all hover:-translate-y-1 hover:shadow-md">
                            <p className="text-lg leading-relaxed font-medium text-slate-700 dark:text-slate-200">
                                {user.bio}
                            </p>
                        </div>
                    )}

                    {/* Stats & Actions */}
                    <div className="mt-8 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-8 bg-white/40 dark:bg-slate-800/40 p-3 rounded-2xl backdrop-blur-sm border border-white/40 dark:border-white/10">
                            <div className="flex flex-col items-center px-4">
                                <span className="text-2xl font-bold text-slate-800 dark:text-white">{user?.followersCount || 0}</span>
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Followers</span>
                            </div>
                            <div className="w-px h-8 bg-amber-200 dark:bg-amber-800"></div>
                            <div className="flex flex-col items-center px-4">
                                <span className="text-2xl font-bold text-slate-800 dark:text-white">{user?.followingCount || 0}</span>
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Following</span>
                            </div>
                            <div className="w-px h-8 bg-amber-200 dark:bg-amber-800"></div>
                            <div className="flex flex-col items-center px-4">
                                <span className="text-2xl font-bold text-slate-800 dark:text-white">{user?.profileViews || 0}</span>
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Views</span>
                            </div>
                        </div>

                        <FollowButton
                            targetUserId={user?.id}
                            className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold rounded-2xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:scale-105 transition-all duration-300 border-2 border-amber-200 dark:border-amber-800"
                        />
                    </div>
                </div>

                {/* Link Bubbles Grid */}
                <div className="w-full max-w-2xl px-4">
                    <div className="flex flex-wrap justify-center items-center">
                        {(user?.links || links).map((link, index) => {
                            const color = bubbleColors[index % bubbleColors.length];
                            const blob = blobStyles[index % blobStyles.length];

                            // Varying sizes based on index
                            const sizeClasses = [
                                'w-28 h-28 md:w-40 md:h-40',
                                'w-24 h-24 md:w-32 md:h-32',
                                'w-32 h-32 md:w-44 md:h-44',
                                'w-26 h-26 md:w-36 md:h-36',
                                'w-28 h-28 md:w-38 md:h-38',
                            ];

                            // Varying margins for organic spacing
                            const marginClasses = [
                                'm-2 md:m-3',
                                'm-3 md:m-4',
                                'm-1 md:m-2',
                                'm-4 md:m-5',
                                'm-2 md:m-4',
                            ];

                            return (
                                <a
                                    key={link.id || index}
                                    href={formatUrl(link)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group flex flex-col items-center justify-center ${sizeClasses[index % sizeClasses.length]} ${marginClasses[index % marginClasses.length]} ${color.bg} text-slate-800 dark:text-white ${blob} shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300`}
                                >
                                    <span className={`material-symbols-outlined text-2xl md:text-3xl mb-1 md:mb-2 group-hover:rotate-12 transition-transform duration-300 ${color.icon}`}>
                                        {link.icon || 'link'}
                                    </span>
                                    <span className="font-bold text-xs md:text-sm text-center px-2 leading-tight">{link.title}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Default message if no links */}
                    {(user?.links || links).length === 0 && (
                        <div className="flex items-center justify-center py-12">
                            <p className="text-slate-400 text-center">Henüz bağlantı eklenmemiş</p>
                        </div>
                    )}
                </div>

                {/* Website Link */}
                {user?.website && (
                    <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-amber-500/20 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
                    >
                        <span className="material-symbols-outlined">language</span>
                        <span>Website</span>
                    </a>
                )}
            </div>

            {/* Footer */}
            <footer className="relative z-10 w-full text-center py-6 text-sm text-slate-400 font-medium">
                <p>Made with Cardly</p>
            </footer>
        </div>
    );
}
