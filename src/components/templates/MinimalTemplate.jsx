// Minimal Template - Clean and simple design
export default function MinimalTemplate({ user, links = [] }) {
    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-16 px-4">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center mb-4">
                {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-2xl font-bold text-slate-400">{getInitials(user?.name)}</span>
                )}
            </div>

            {/* Name */}
            <h1 className="text-xl font-semibold text-slate-900 mb-1">{user?.name || 'Kullanıcı'}</h1>

            {/* Bio */}
            {user?.bio && (
                <p className="text-sm text-slate-500 text-center max-w-xs mb-6">{user.bio}</p>
            )}

            {/* Location */}
            {user?.location && (
                <p className="text-xs text-slate-400 mb-8 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {user.location}
                </p>
            )}

            {/* Links */}
            <div className="w-full max-w-md space-y-3">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-4 px-6 rounded-lg border border-slate-200 text-center text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                        {link.title}
                    </a>
                ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
                {user?.website && (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined">language</span>
                    </a>
                )}
            </div>

            {/* Footer */}
            <p className="mt-auto pt-8 text-xs text-slate-300">Cardly</p>
        </div>
    );
}
