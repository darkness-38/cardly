// Professional Template - Corporate and clean design
export default function ProfessionalTemplate({ user, links = [] }) {
    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header Bar */}
            <div className="bg-white border-b border-slate-200 py-4 px-6">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-400">Profil</span>
                    {user?.website && (
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            {user.website.replace(/^https?:\/\//, '')}
                        </a>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto px-6 py-12">
                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-xl bg-slate-200 overflow-hidden flex-shrink-0">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">{getInitials(user?.name)}</span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-slate-900 mb-1">{user?.name || 'Kullanıcı'}</h1>
                            {user?.location && (
                                <p className="text-sm text-slate-500 mb-3 flex items-center justify-center sm:justify-start gap-1">
                                    <span className="material-symbols-outlined text-base">location_on</span>
                                    {user.location}
                                </p>
                            )}
                            {user?.bio && (
                                <p className="text-slate-600 leading-relaxed">{user.bio}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100">
                        <h2 className="font-semibold text-slate-900">Bağlantılar</h2>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-medium text-slate-700">{link.title}</span>
                                <span className="material-symbols-outlined text-slate-400">open_in_new</span>
                            </a>
                        ))}
                        {links.length === 0 && (
                            <p className="px-6 py-8 text-center text-slate-400">Henüz bağlantı yok</p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center mt-12 text-sm text-slate-300">Cardly ile oluşturuldu</p>
            </div>
        </div>
    );
}
