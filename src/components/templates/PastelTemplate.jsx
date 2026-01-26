// Pastel Template - Soft pastel colors
export default function PastelTemplate({ user, links = [] }) {
    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const pastelColors = [
        'bg-pink-100 text-pink-600 border-pink-200 hover:bg-pink-50',
        'bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-50',
        'bg-green-100 text-green-600 border-green-200 hover:bg-green-50',
        'bg-yellow-100 text-yellow-600 border-yellow-200 hover:bg-yellow-50',
        'bg-purple-100 text-purple-600 border-purple-200 hover:bg-purple-50',
        'bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-50',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100 flex flex-col items-center py-16 px-4">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-white shadow-lg overflow-hidden flex items-center justify-center mb-4 ring-4 ring-white">
                {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">{getInitials(user?.name)}</span>
                    </div>
                )}
            </div>

            {/* Name */}
            <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">{user?.name || 'Kullanıcı'}</h1>

            {/* Bio */}
            {user?.bio && (
                <p className="text-slate-600 text-center max-w-xs mb-4">{user.bio}</p>
            )}

            {/* Location */}
            {user?.location && (
                <p className="text-sm text-slate-400 mb-8 flex items-center gap-1">
                    <span className="material-symbols-outlined text-base text-pink-400">location_on</span>
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
                        className={`block w-full py-4 px-6 rounded-2xl border-2 font-semibold text-center transition-all hover:scale-[1.02] ${pastelColors[index % pastelColors.length]}`}
                    >
                        {link.title}
                    </a>
                ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
                {user?.website && (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-pink-400 hover:text-pink-500 transition-colors">
                        <span className="material-symbols-outlined">language</span>
                    </a>
                )}
            </div>

            {/* Footer */}
            <p className="mt-auto pt-8 text-sm text-slate-300">✨ Cardly</p>
        </div>
    );
}
