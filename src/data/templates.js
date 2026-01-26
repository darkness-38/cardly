// Template definitions
export const templates = [
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Sade ve temiz tasarım',
        preview: 'bg-white',
        isPremium: false
    },
    {
        id: 'gradient-hero',
        name: 'Gradient Hero',
        description: 'Canlı gradyanlar ile etkileyici görünüm',
        preview: 'bg-gradient-to-br from-purple-500 to-blue-500',
        isPremium: false
    },
    {
        id: 'dark-mode',
        name: 'Dark Mode',
        description: 'Koyu tema, modern görünüm',
        preview: 'bg-slate-900',
        isPremium: false
    },
    {
        id: 'pastel',
        name: 'Pastel',
        description: 'Yumuşak pastel renkler',
        preview: 'bg-gradient-to-br from-pink-200 to-yellow-200',
        isPremium: false
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Kurumsal ve profesyonel',
        preview: 'bg-slate-100',
        isPremium: false
    },
    {
        id: 'creative',
        name: 'Creative',
        description: 'Yaratıcı ve cesur tasarım',
        preview: 'bg-gradient-to-br from-orange-400 to-pink-600',
        isPremium: false
    }
];

export const getTemplate = (id) => {
    return templates.find(t => t.id === id) || templates[0];
};
