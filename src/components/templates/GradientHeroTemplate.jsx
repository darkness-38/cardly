// Gradient Hero Template - Vibrant gradient header design
export default function GradientHeroTemplate({ user, links = [] }) {
    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Header */}
            <div className="h-48 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 relative">
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Content */}
            <div className="max-w-md mx-auto px-4 -mt-16 relative z-10 pb-16">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-2xl bg-white shadow-xl overflow-hidden flex items-center justify-center mx-auto mb-4 border-4 border-white">
                    {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">{getInitials(user?.name)}</span>
                        </div>
                    )}
                </div>

                {/* Name */}
                <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">{user?.name || 'Kullanıcı'}</h1>

                {/* Bio */}
                {user?.bio && (
                    <p className="text-slate-600 text-center max-w-xs mx-auto mb-4">{user.bio}</p>
                )}

                {/* Location */}
                {user?.location && (
                    <p className="text-sm text-slate-400 text-center mb-8 flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-base">location_on</span>
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
                            className="group block w-full py-4 px-6 rounded-xl bg-white shadow-md hover:shadow-xl text-slate-800 font-medium transition-all hover:-translate-y-0.5 flex items-center justify-between"
                        >
                            <span>{link.title}</span>
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all">arrow_forward</span>
                        </a>
                    ))}
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 mt-8">
                    {user?.website && (
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-500 hover:text-purple-500 hover:shadow-lg transition-all">
                            <span className="material-symbols-outlined">language</span>
                        </a>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center mt-12 text-sm text-slate-300">Powered by Cardly</p>
            </div>
        </div>
    );
}
