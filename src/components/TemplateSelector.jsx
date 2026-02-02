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

    const handleSelect = (templateId) => {
        onSelect(templateId);
        setPreviewTemplate(templateId);
    };

    return (
        <div className="space-y-6">
            {/* Template Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => handleSelect(template.id)}
                        className={`relative group rounded-2xl overflow-hidden border-2 transition-all hover:scale-[1.02] ${currentTemplate === template.id
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                            }`}
                    >
                        {/* Preview Thumbnail */}
                        <div className="h-32">
                            {template.id === 'playful' && (
                                <div className="h-full bg-amber-50 relative overflow-hidden">
                                    <div className="absolute top-2 left-2 w-6 h-6 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-amber-200"></div>
                                    <div className="absolute top-4 right-3 w-5 h-5 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-pink-200"></div>
                                    <div className="absolute bottom-3 left-3 w-5 h-5 rounded-[53%_47%_52%_48%/36%_41%_59%_64%] bg-blue-200"></div>
                                    <div className="absolute bottom-2 right-2 w-4 h-4 rounded-[70%_30%_30%_70%/60%_40%_60%_40%] bg-green-200"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-400 border-2 border-dashed border-amber-600"></div>
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

                        {/* Eye icon for preview */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                                visibility
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Live Preview Modal */}
            {previewTemplate && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setPreviewTemplate(null)}>
                    <div className="relative" onClick={e => e.stopPropagation()}>
                        {/* Close button */}
                        <button
                            onClick={() => setPreviewTemplate(null)}
                            className="absolute -top-12 right-0 text-white hover:text-slate-300 flex items-center gap-2"
                        >
                            <span>{language === 'tr' ? 'Kapat' : 'Close'}</span>
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        {/* Phone frame */}
                        <div className="w-[340px] rounded-[2.5rem] border-[8px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden">
                            {/* Notch */}
                            <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 z-30 flex justify-center">
                                <div className="h-4 w-32 bg-black rounded-b-xl"></div>
                            </div>
                            {/* Screen */}
                            <div className="h-[600px] overflow-y-auto no-scrollbar">
                                <PreviewComponent user={user} links={sampleLinks} />
                            </div>
                        </div>

                        {/* Template name */}
                        <p className="text-center text-white mt-4 font-medium">
                            {templates.find(t => t.id === previewTemplate)?.name}
                            {currentTemplate === previewTemplate && (
                                <span className="ml-2 text-primary">✓ {language === 'tr' ? 'Seçili' : 'Selected'}</span>
                            )}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
