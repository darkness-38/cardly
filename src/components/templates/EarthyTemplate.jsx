// Earthy Template - Natural, organic, calm aesthetic
import { useLanguage } from '../../context/LanguageContext';

export default function EarthyTemplate({ user, links = [] }) {
    const { language } = useLanguage();

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Split links: first 4 for floating, rest for footer
    const floatingLinks = links.slice(0, 4);
    const extraLinks = links.slice(4);

    return (
        <div className="font-display bg-[#f2efeb] dark:bg-[#221510] text-[#3d342f] dark:text-[#fcf9f8] min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-300">
            {/* Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]"></div>

            {/* Organic Background Blobs */}
            <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#8a9a5b]/10 dark:bg-[#8a9a5b]/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#ee5b2b]/10 dark:bg-[#ee5b2b]/5 rounded-full blur-[80px] -z-10 animate-pulse"></div>

            {/* Made with Cardly - Top */}
            <a
                href="https://cardly.qzz.io"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed top-4 left-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-stone-200/50 dark:border-white/10 text-xs font-medium text-[#3d342f] dark:text-white hover:bg-white/80 dark:hover:bg-white/20 transition-all"
            >
                <span className="material-symbols-outlined text-[14px] text-[#ee5b2b]">eco</span>
                Made with Cardly
            </a>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center relative w-full max-w-7xl mx-auto px-4 py-12 md:py-20 z-10">
                {/* Central Profile Hub */}
                <div className="relative z-20 flex flex-col items-center text-center max-w-md w-full">
                    {/* Avatar */}
                    <div className="mb-6 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#8a9a5b] to-[#ee5b2b] opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
                        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl shadow-stone-200 dark:shadow-black/40 relative z-10 bg-gradient-to-br from-[#8a9a5b] to-[#ee5b2b] flex items-center justify-center">
                            {user?.avatar ? (
                                <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl font-bold text-white">{getInitials(user?.name)}</span>
                            )}
                        </div>
                    </div>

                    {/* Bio Info */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-[#3d342f] dark:text-white">
                        {user?.name || 'Your Name'}
                    </h2>
                    {user?.username && (
                        <p className="text-[#8a9a5b] font-medium text-lg mb-2">@{user.username}</p>
                    )}
                    {user?.bio && (
                        <p className="text-stone-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto mb-8">
                            {user.bio}
                        </p>
                    )}

                    {/* Website Button */}
                    {user?.website && (
                        <a
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 bg-[#ee5b2b] hover:bg-[#d64a1f] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-[#ee5b2b]/20 transition-all hover:scale-105 active:scale-95 mb-8"
                        >
                            <span>Visit My Website</span>
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </a>
                    )}
                </div>

                {/* Floating Links - First 4 only */}
                <div className="w-full flex flex-col gap-4 mt-8 md:mt-0 md:absolute md:inset-0 md:pointer-events-none">
                    {floatingLinks.map((link, index) => {
                        const positions = [
                            'md:top-[15%] md:left-[10%] lg:left-[15%]',
                            'md:top-[20%] md:right-[10%] lg:right-[15%]',
                            'md:bottom-[15%] md:left-[12%] lg:left-[18%]',
                            'md:bottom-[20%] md:right-[12%] lg:right-[20%]',
                        ];
                        const colors = [
                            { bg: 'bg-[#e6decb]/30 dark:bg-white/10', text: 'text-[#3d342f] dark:text-white', label: 'text-[#ee5b2b]' },
                            { bg: 'bg-[#8a9a5b]/20 dark:bg-[#8a9a5b]/10', text: 'text-[#8a9a5b]', label: 'text-[#8a9a5b]' },
                            { bg: 'bg-[#e6decb]/30 dark:bg-white/10', text: 'text-[#3d342f] dark:text-white', label: 'text-stone-400' },
                            { bg: 'bg-[#ee5b2b]/10', text: 'text-[#ee5b2b]', label: 'text-[#ee5b2b]' },
                        ];
                        const position = positions[index];
                        const color = colors[index];

                        return (
                            <a
                                key={link.id || index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`pointer-events-auto md:absolute ${position} w-full md:w-auto transform transition-transform hover:scale-105`}
                            >
                                <div className="flex items-center gap-4 bg-white dark:bg-[#33251f] p-4 pr-8 rounded-full shadow-lg shadow-stone-200/50 dark:shadow-black/20 hover:shadow-xl border border-stone-100 dark:border-white/5">
                                    <div className={`w-12 h-12 rounded-full ${color.bg} flex items-center justify-center ${color.text}`}>
                                        <span className="material-symbols-outlined">{link.icon || 'link'}</span>
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-xs font-bold uppercase tracking-wider ${color.label}`}>
                                            {link.title}
                                        </span>
                                        <span className="font-bold text-[#3d342f] dark:text-white">
                                            {link.url?.replace(/^https?:\/\//, '').split('/')[0] || 'Link'}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full relative z-20 py-8">
                <div className="max-w-md mx-auto px-4">
                    {/* Extra Links as Round Buttons */}
                    {extraLinks.length > 0 && (
                        <div className="flex justify-center gap-3 flex-wrap mb-6">
                            {extraLinks.map((link, index) => (
                                <a
                                    key={link.id || `extra-${index}`}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-[#33251f] text-[#3d342f] dark:text-white shadow-md hover:shadow-lg hover:scale-110 transition-all border border-stone-200 dark:border-white/10"
                                    title={link.title}
                                >
                                    <span className="material-symbols-outlined text-xl">{link.icon || 'link'}</span>
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Made with Cardly - Bottom */}
                    <a
                        href="https://cardly.qzz.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-xs text-stone-400 hover:text-[#ee5b2b] transition-colors"
                    >
                        <span className="material-symbols-outlined text-[14px]">eco</span>
                        Made with Cardly
                    </a>
                </div>
            </footer>
        </div>
    );
}

