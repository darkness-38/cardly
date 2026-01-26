// Neumorphic Template - Soft shadows and tactile feel
import { useLanguage } from '../../context/LanguageContext';

export default function NeumorphicTemplate({ user, links = [] }) {
    const { t } = useLanguage();

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

    return (
        <div className="min-h-screen bg-[#bfbfbf] dark:bg-[#191919] text-[#2d2d2d] dark:text-[#e5e5e5] font-sans transition-colors duration-300">
            <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-x-hidden">

                {/* Profile Card */}
                <div className="w-full max-w-[720px] flex flex-col items-center gap-8 mb-12">

                    {/* Avatar Section */}
                    <div className="relative group cursor-default">
                        {/* Outer ring */}
                        <div className="absolute inset-0 rounded-full bg-[#bfbfbf] dark:bg-[#191919] shadow-[6px_6px_12px_#969696,-6px_-6px_12px_#dadada] dark:shadow-[6px_6px_12px_#000000,-6px_-6px_12px_#262626] opacity-100 scale-110"></div>

                        {/* Avatar Container */}
                        <div className="relative w-40 h-40 rounded-full bg-[#bfbfbf] dark:bg-[#191919] shadow-[6px_6px_12px_#969696,-6px_-6px_12px_#dadada] dark:shadow-[6px_6px_12px_#000000,-6px_-6px_12px_#262626] p-2 flex items-center justify-center transition-transform duration-500 hover:scale-[1.02]">
                            <div className="w-full h-full rounded-full overflow-hidden bg-cover bg-center shadow-[inset_4px_4px_8px_#969696,inset_-4px_-4px_8px_#dadada] dark:shadow-[inset_4px_4px_8px_#000000,inset_-4px_-4px_8px_#262626] border-4 border-[#bfbfbf] dark:border-[#191919] flex items-center justify-center">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl font-bold text-[#525252] dark:text-[#a3a3a3]">{getInitials(user?.name)}</span>
                                )}
                            </div>
                        </div>

                        {/* Status Dot */}
                        <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#bfbfbf] dark:bg-[#191919] shadow-[5px_5px_10px_#969696,-5px_-5px_10px_#dadada] dark:shadow-[5px_5px_10px_#000000,-5px_-5px_10px_#262626] flex items-center justify-center text-green-600">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#2d2d2d] dark:text-[#e5e5e5]">
                            {user?.name || 'User Name'}
                        </h1>
                        {user?.bio && (
                            <p className="text-lg font-medium opacity-80 max-w-md text-[#525252] dark:text-[#a3a3a3]">
                                {user.bio}
                            </p>
                        )}
                        {user?.location && (
                            <div className="flex items-center gap-1 text-sm font-medium opacity-60">
                                <span className="material-symbols-outlined text-lg">location_on</span>
                                {user.location}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex w-full max-w-sm gap-4">
                        {user?.website && (
                            <a
                                href={user.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 h-12 rounded-full bg-[#bfbfbf] dark:bg-[#191919] shadow-[5px_5px_10px_#969696,-5px_-5px_10px_#dadada] dark:shadow-[5px_5px_10px_#000000,-5px_-5px_10px_#262626] font-bold text-sm tracking-wide flex items-center justify-center gap-2 group hover:-translate-y-0.5 transition-transform active:translate-y-0 active:shadow-[inset_3px_3px_6px_#969696,inset_-3px_-3px_6px_#dadada] dark:active:shadow-[inset_3px_3px_6px_#000000,inset_-3px_-3px_6px_#262626]"
                            >
                                <span className="material-symbols-outlined text-lg transition-transform group-hover:rotate-12">language</span>
                                Website
                            </a>
                        )}
                    </div>

                    {/* Social Links (Bubbles) */}
                    <div className="flex gap-4 flex-wrap justify-center mt-2">
                        {(user?.links || links).map((link, index) => (
                            <a
                                key={link.id || index}
                                href={formatUrl(link)}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.title}
                                className="w-12 h-12 rounded-full bg-[#bfbfbf] dark:bg-[#191919] shadow-[5px_5px_10px_#969696,-5px_-5px_10px_#dadada] dark:shadow-[5px_5px_10px_#000000,-5px_-5px_10px_#262626] flex items-center justify-center hover:scale-105 hover:text-[#404040] dark:hover:text-[#ffffff] transition-all text-[#2d2d2d] dark:text-[#e5e5e5]"
                            >
                                <span className="material-symbols-outlined text-xl">{link.icon || 'link'}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Links List Section */}
                {/* For Playful template we used floating bubbles, but for Neumorphic a list makes more sense given the design */}
                {/* Reusing links data but presenting as sleek list items */}
                <div className="w-full max-w-[600px] flex flex-col gap-4">
                    {(user?.links || links).map((link, index) => (
                        <a
                            key={link.id || index}
                            href={formatUrl(link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <div className="w-full p-4 rounded-2xl bg-[#bfbfbf] dark:bg-[#191919] shadow-[6px_6px_12px_#969696,-6px_-6px_12px_#dadada] dark:shadow-[6px_6px_12px_#000000,-6px_-6px_12px_#262626] flex items-center justify-between transition-all hover:-translate-y-1 hover:shadow-[8px_8px_16px_#969696,-8px_-8px_16px_#dadada] dark:hover:shadow-[8px_8px_16px_#000000,-8px_-8px_16px_#262626] border border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#bfbfbf] dark:bg-[#191919] shadow-[inset_3px_3px_6px_#969696,inset_-3px_-3px_6px_#dadada] dark:shadow-[inset_3px_3px_6px_#000000,inset_-3px_-3px_6px_#262626] flex items-center justify-center text-[#525252] dark:text-[#a3a3a3]">
                                        <span className="material-symbols-outlined text-lg">{link.icon || 'link'}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#2d2d2d] dark:text-[#e5e5e5]">{link.title}</h3>
                                        <p className="text-xs text-[#525252] dark:text-[#a3a3a3] opacity-70 truncate max-w-[200px]">{link.url}</p>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-[#bfbfbf] dark:bg-[#191919] shadow-[3px_3px_6px_#969696,-3px_-3px_6px_#dadada] dark:shadow-[3px_3px_6px_#000000,-3px_-3px_6px_#262626] flex items-center justify-center text-[#525252] dark:text-[#a3a3a3] group-hover:text-green-600 transition-colors">
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Footer */}
                <footer className="mt-20 text-center opacity-40 text-sm font-medium text-[#2d2d2d] dark:text-[#e5e5e5]">
                    <p>© {new Date().getFullYear()} {user?.name}. Made with Cardly.</p>
                </footer>

            </div>
        </div>
    );
}
