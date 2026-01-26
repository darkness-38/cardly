// Creative Template - Bold asymmetric design with large typography
export default function CreativeTemplate({ user, links = [] }) {
    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 relative overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-32 left-10 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 right-1/4 w-24 h-24 border-4 border-white/20 rounded-full"></div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col px-6 py-12">
                {/* Header */}
                <div className="flex items-start gap-4 mb-12">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm overflow-hidden flex-shrink-0 border-2 border-white/30">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">{getInitials(user?.name)}</span>
                            </div>
                        )}
                    </div>
                    {user?.location && (
                        <span className="mt-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                            📍 {user.location}
                        </span>
                    )}
                </div>

                {/* Large Name */}
                <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4">
                    {user?.name?.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                    )) || 'Kullanıcı'}
                </h1>

                {/* Bio */}
                {user?.bio && (
                    <p className="text-xl text-white/80 max-w-md mb-12 leading-relaxed">{user.bio}</p>
                )}

                {/* Links */}
                <div className="mt-auto space-y-4 max-w-sm">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 text-white hover:translate-x-2 transition-transform"
                        >
                            <span className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <span className="material-symbols-outlined">arrow_outward</span>
                            </span>
                            <span className="text-lg font-semibold">{link.title}</span>
                        </a>
                    ))}
                </div>

                {/* Social & Footer */}
                <div className="mt-12 flex items-center justify-between">
                    <div className="flex gap-3">
                        {user?.website && (
                            <a href={user.website} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                                <span className="material-symbols-outlined text-xl">language</span>
                            </a>
                        )}
                    </div>
                    <p className="text-white/40 text-sm">Cardly ⚡</p>
                </div>
            </div>
        </div>
    );
}
