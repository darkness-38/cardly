// Dark Mode Template - Modern dark theme with neon accents
export default function DarkModeTemplate({ user, links = [] }) {
    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center py-16 px-4 relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md">
                {/* Avatar */}
                <div className="w-28 h-28 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden flex items-center justify-center mx-auto mb-4 ring-4 ring-purple-500/30">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-3xl font-bold text-slate-400">{getInitials(user?.name)}</span>
                    )}
                </div>

                {/* Name */}
                <h1 className="text-2xl font-bold text-white text-center mb-2">{user?.name || 'Kullanıcı'}</h1>

                {/* Bio */}
                {user?.bio && (
                    <p className="text-slate-400 text-center max-w-xs mx-auto mb-4">{user.bio}</p>
                )}

                {/* Location */}
                {user?.location && (
                    <p className="text-sm text-slate-500 text-center mb-8 flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-base text-purple-400">location_on</span>
                        {user.location}
                    </p>
                )}

                {/* Links */}
                <div className="space-y-3">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block w-full py-4 px-6 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white font-medium hover:bg-slate-800 hover:border-purple-500/50 transition-all flex items-center justify-between"
                        >
                            <span>{link.title}</span>
                            <span className="material-symbols-outlined text-slate-500 group-hover:text-purple-400 transition-colors">chevron_right</span>
                        </a>
                    ))}
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 mt-8">
                    {user?.website && (
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/50 transition-all">
                            <span className="material-symbols-outlined">language</span>
                        </a>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center mt-12 text-sm text-slate-600">Cardly</p>
            </div>
        </div>
    );
}
