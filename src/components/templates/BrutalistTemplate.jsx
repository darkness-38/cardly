// Brutalist Template - Raw, high contrast, bold typography
import { useLanguage } from '../../context/LanguageContext';
import FollowButton from '../FollowButton';

export default function BrutalistTemplate({ user, links = [] }) {
    const { t } = useLanguage();

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const marqueeText = user?.marqueeText || "Digital Designer /// Frontend Wizard /// Based in Tokyo /// Scroll For More /// Digital Designer /// Frontend Wizard";
    const primaryColor = "#f91fb1";
    const bgDark = "#230f1c";

    return (
        <div className="min-h-screen flex flex-col font-sans bg-[#f8f5f7] dark:bg-[#230f1c] text-[#230f1c] dark:text-[#f8f5f7] selection:bg-[#f91fb1] selection:text-white overflow-x-hidden">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b-4 border-[#f91fb1] bg-[#230f1c] px-4 py-4 md:px-10">
                <div className="flex items-center gap-4">
                    <a
                        href="https://cardly.qzz.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#f91fb1]/20 rounded-sm border border-[#f91fb1]/40 hover:bg-[#f91fb1]/30 transition-colors"
                    >
                        <span className="text-[#f91fb1] text-sm">✦</span>
                        <span className="text-xs font-bold text-[#f91fb1] uppercase tracking-wider">Made with Cardly</span>
                    </a>
                    <div className="hidden md:block w-px h-6 bg-[#f91fb1]/30"></div>
                    <h2 className="hidden md:block text-white text-xl font-black uppercase tracking-tighter">{user?.name || "[Creator Name]"}</h2>
                </div>

                <button className="sm:hidden text-[#f91fb1]">
                    <span className="material-symbols-outlined !text-4xl">menu</span>
                </button>
            </header>

            {/* Marquee Text Strip */}
            <div className="border-b-4 border-[#f91fb1] bg-[#f91fb1]/10 py-3 overflow-hidden relative">
                <div className="animate-marquee whitespace-nowrap">
                    <h1 className="text-[#f91fb1] tracking-widest text-[24px] md:text-[42px] font-black leading-tight px-4 text-center inline-block uppercase italic">
                        {marqueeText} &nbsp;///&nbsp; {marqueeText} &nbsp;///&nbsp; {marqueeText}
                    </h1>
                </div>
            </div>

            {/* Main Grid Layout */}
            <main className="flex-grow w-full max-w-[1600px] mx-auto border-x-0 md:border-x-4 border-[#f91fb1] border-b-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-180px)]">
                    {/* Left Column: Profile Image */}
                    <div className="relative col-span-1 lg:col-span-5 border-b-4 lg:border-b-0 lg:border-r-4 border-[#f91fb1] group overflow-hidden bg-[#230f1c]">
                        {/* Image Container */}
                        <div className="absolute inset-0 bg-cover bg-center grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                            style={{
                                backgroundImage: `url("${user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop'}")`,
                                backgroundColor: '#230f1c'
                            }}>
                        </div>
                        {/* Overlay content on image */}
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#230f1c] via-[#230f1c]/80 to-transparent">
                            <h2 className="text-white text-4xl font-black uppercase italic tracking-tighter leading-none mb-2">
                                Creator<br />Profile
                            </h2>
                            <p className="text-[#f91fb1] font-bold tracking-widest text-sm uppercase mb-4">
                                {user?.location ? `Based in ${user.location.split(',')[0]}` : 'Based in Digital'}
                            </p>

                            {/* Stats & Actions */}
                            <div className="flex items-end justify-between gap-4">
                                <div className="flex gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-white font-black text-2xl leading-none">{user?.followersCount || 0}</span>
                                        <span className="text-[#f91fb1] text-[10px] font-mono uppercase">Followers</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-black text-2xl leading-none">{user?.followingCount || 0}</span>
                                        <span className="text-[#f91fb1] text-[10px] font-mono uppercase">Following</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-black text-2xl leading-none">{user?.profileViews || 0}</span>
                                        <span className="text-[#f91fb1] text-[10px] font-mono uppercase">Views</span>
                                    </div>
                                </div>

                                <FollowButton
                                    targetUserId={user?.id}
                                    className="px-4 py-2 bg-[#f91fb1] text-white font-black uppercase tracking-widest border-2 border-transparent hover:bg-white hover:text-[#230f1c] hover:border-[#230f1c] transition-all text-sm"
                                />
                            </div>

                            {user?.location && (
                                <div className="mt-4 inline-flex items-center gap-2 border border-[#f91fb1] px-3 py-1 rounded-sm bg-[#230f1c]/50 backdrop-blur-sm">
                                    <span className="material-symbols-outlined text-[#f91fb1] text-sm">location_on</span>
                                    <span className="text-xs text-white uppercase font-bold">{user.location}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Content Grid */}
                    <div className="col-span-1 lg:col-span-7 flex flex-col">
                        {/* Intro & Bio Section */}
                        <div className="p-8 md:p-12 border-b-4 border-[#f91fb1] bg-[#230f1c] flex flex-col justify-center min-h-[300px] relative overflow-hidden">
                            <span className="text-[#f91fb1] font-black text-6xl md:text-8xl opacity-20 absolute select-none pointer-events-none translate-x-[-20px] translate-y-[-40px]">HELLO</span>
                            <p className="relative text-white/90 text-xl md:text-3xl font-bold leading-relaxed tracking-tight max-w-2xl z-10">
                                {user?.bio ? (
                                    <>
                                        {user.bio} <span className="text-[#f91fb1] bg-white/10 px-2 italic">break the grid</span>.
                                    </>
                                ) : (
                                    <>I craft digital experiences that <span className="text-[#f91fb1] bg-white/10 px-2 italic">break the grid</span>. Specializing in brutalist aesthetics and high-performance frontend development.</>
                                )}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4 z-10">
                                <div className="px-4 py-2 border-2 border-white/20 rounded-sm text-white/60 font-mono text-sm uppercase hover:border-[#f91fb1] hover:text-[#f91fb1] cursor-default transition-colors">
                                    UI/UX Design
                                </div>
                                <div className="px-4 py-2 border-2 border-white/20 rounded-sm text-white/60 font-mono text-sm uppercase hover:border-[#f91fb1] hover:text-[#f91fb1] cursor-default transition-colors">
                                    React / Vue
                                </div>
                                <div className="px-4 py-2 border-2 border-white/20 rounded-sm text-white/60 font-mono text-sm uppercase hover:border-[#f91fb1] hover:text-[#f91fb1] cursor-default transition-colors">
                                    Motion
                                </div>
                            </div>
                        </div>

                        {/* Main CTA (Website) */}
                        {user?.website && (
                            <div className="border-b-4 border-[#f91fb1]">
                                <a href={user.website} target="_blank" rel="noopener noreferrer" className="group relative w-full h-32 bg-[#f91fb1] flex items-center justify-center overflow-hidden hover:bg-white transition-colors duration-300">
                                    <span className="relative z-10 text-[#230f1c] text-4xl md:text-5xl font-black uppercase tracking-tighter group-hover:text-[#f91fb1] transition-colors">
                                        Visit Website
                                    </span>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-multiply"></div>
                                    <span className="material-symbols-outlined absolute right-8 text-6xl text-[#230f1c]/20 group-hover:text-[#f91fb1]/20 transition-all group-hover:rotate-45 group-hover:scale-125">
                                        arrow_outward
                                    </span>
                                </a>
                            </div>
                        )}

                        {/* Links Grid (2x2) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 grow">
                            {(user?.links || links).map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative flex flex-col justify-between p-6 border-b-4 sm:border-b-0 border-[#f91fb1] hover:bg-white hover:text-[#230f1c] transition-colors duration-300 h-48 sm:h-auto ${index % 2 === 0 ? 'sm:border-r-4' : ''} bg-[#230f1c]`}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="material-symbols-outlined text-4xl text-[#f91fb1] group-hover:text-[#230f1c] transition-colors">{link.icon || 'link'}</span>
                                        <span className="material-symbols-outlined text-2xl text-white/20 group-hover:text-[#230f1c]/20 -rotate-45 group-hover:rotate-0 transition-transform duration-300">arrow_forward</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white uppercase group-hover:text-[#230f1c] transition-colors">{link.title}</h3>
                                        <p className="text-sm font-mono text-[#f91fb1] group-hover:text-[#230f1c]/60 transition-colors">Visit Link</p>
                                    </div>
                                </a>
                            ))}
                            {(!user?.links || user.links.length === 0) && links.length === 0 && (
                                <div className="col-span-2 p-12 text-center text-white/40 font-mono uppercase bg-[#230f1c]">
                                    No links added yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Raw Footer */}
            <footer className="border-b-4 border-x-0 md:border-x-4 border-[#f91fb1] bg-[#230f1c] mx-auto w-full max-w-[1600px] mb-10">
                <div className="flex flex-col md:flex-row divide-y-4 md:divide-y-0 md:divide-x-4 divide-[#f91fb1]">
                    <div className="flex-1 p-6 flex flex-col justify-center text-white">
                        <p className="text-[#f91fb1] font-mono text-xs uppercase tracking-widest mb-1">Established</p>
                        <p className="text-3xl font-black">{new Date().getFullYear()}</p>
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-center text-white">
                        <p className="text-[#f91fb1] font-mono text-xs uppercase tracking-widest mb-1">Status</p>
                        <p className="text-3xl font-black">ONLINE</p>
                    </div>
                    <div className="flex-1 p-6 flex items-center justify-between group cursor-pointer bg-[#f91fb1] hover:bg-white transition-colors">
                        <div>
                            <p className="text-[#230f1c] font-mono text-xs uppercase tracking-widest mb-1 font-bold">Contact Me</p>
                            <p className="text-white group-hover:text-[#230f1c] text-xl font-black underline decoration-2 underline-offset-4">hello@creator.com</p>
                        </div>
                        <span className="material-symbols-outlined text-[#230f1c] text-4xl group-hover:rotate-12 transition-transform">send</span>
                    </div>
                </div>
                <div className="bg-black p-2 text-center border-t-4 border-[#f91fb1]">
                    <p className="text-[#f91fb1]/50 text-[10px] font-mono uppercase">© Made by Cardly</p>
                </div>
            </footer>
        </div>
    );
}
