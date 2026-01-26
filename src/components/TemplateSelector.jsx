import { useState } from 'react';
import { templates } from '../data/templates';
import { getTemplateComponent } from './templates';
import { useLanguage } from '../context/LanguageContext';

export default function TemplateSelector({ currentTemplate, onSelect, user }) {
    const [previewTemplate, setPreviewTemplate] = useState(null);
    const { language } = useLanguage();

    const sampleLinks = [
        { title: language === 'tr' ? 'Son Video' : 'Latest Video', url: '#' },
        { title: 'Portfolio', url: '#' },
        { title: language === 'tr' ? 'Mağaza' : 'Shop', url: '#' },
    ];

    const PreviewComponent = previewTemplate ? getTemplateComponent(previewTemplate) : null;

    return (
        <div className="space-y-6">
            {/* Template Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => onSelect(template.id)}
                        onMouseEnter={() => setPreviewTemplate(template.id)}
                        onMouseLeave={() => setPreviewTemplate(null)}
                        className={`relative group rounded-2xl overflow-hidden border-2 transition-all hover:scale-[1.02] ${currentTemplate === template.id
                                ? 'border-primary ring-2 ring-primary/20'
                                : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                            }`}
                    >
                        {/* Preview Thumbnail */}
                        <div className={`h-32 ${template.preview}`}>
                            {template.id === 'minimal' && (
                                <div className="h-full flex flex-col items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                    <div className="mt-2 w-16 h-2 bg-slate-200 rounded"></div>
                                </div>
                            )}
                            {template.id === 'gradient-hero' && (
                                <div className="h-full flex flex-col">
                                    <div className="h-12 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                                    <div className="flex-1 bg-slate-50 flex flex-col items-center pt-4">
                                        <div className="w-8 h-8 rounded-lg bg-white shadow-sm -mt-6"></div>
                                        <div className="mt-2 w-16 h-2 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                            )}
                            {template.id === 'dark-mode' && (
                                <div className="h-full bg-slate-900 flex flex-col items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 ring-2 ring-purple-500/30"></div>
                                    <div className="mt-2 w-16 h-2 bg-slate-700 rounded"></div>
                                </div>
                            )}
                            {template.id === 'pastel' && (
                                <div className="h-full bg-gradient-to-br from-pink-100 to-yellow-100 flex flex-col items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-white shadow"></div>
                                    <div className="mt-2 w-16 h-2 bg-pink-200 rounded"></div>
                                </div>
                            )}
                            {template.id === 'professional' && (
                                <div className="h-full bg-slate-100 flex flex-col">
                                    <div className="h-4 bg-white border-b border-slate-200"></div>
                                    <div className="flex-1 flex items-center justify-center gap-2 p-2">
                                        <div className="w-6 h-6 rounded bg-slate-300"></div>
                                        <div className="flex-1">
                                            <div className="w-12 h-1.5 bg-slate-300 rounded mb-1"></div>
                                            <div className="w-8 h-1 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {template.id === 'creative' && (
                                <div className="h-full bg-gradient-to-br from-orange-400 to-pink-600 p-3">
                                    <div className="w-6 h-6 rounded-lg bg-white/20 mb-2"></div>
                                    <div className="w-12 h-2 bg-white/80 rounded mb-1"></div>
                                    <div className="w-8 h-2 bg-white/80 rounded"></div>
                                </div>
                            )}
                        </div>

                        {/* Template Name */}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
                            <p className="text-white text-sm font-medium">{template.name}</p>
                        </div>

                        {/* Selected Check */}
                        {currentTemplate === template.id && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                                <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                        )}

                        {/* Premium Badge */}
                        {template.isPremium && (
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-400 text-amber-900 text-xs font-bold">
                                PRO
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Live Preview */}
            {previewTemplate && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setPreviewTemplate(null)}>
                    <div className="w-full max-w-sm h-[600px] rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <PreviewComponent user={user} links={sampleLinks} />
                    </div>
                </div>
            )}
        </div>
    );
}
