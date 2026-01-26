// Template definitions
export const templates = [
    {
        id: 'playful',
        name: 'Playful',
        description: 'Eğlenceli ve dinamik tasarım',
        preview: 'bg-amber-50',
        isPremium: false
    },
    {
        id: 'neumorphic',
        name: 'Neumorphism',
        description: 'Soft UI ve taktiksel dokunuşlar',
        preview: 'bg-[#bfbfbf]',
        isPremium: false
    },
    {
        id: 'brutalist',
        name: 'Brutalist',
        description: 'Yüksek kontrast, neon ve ham tasarım',
        preview: 'bg-[#230f1c]',
        isPremium: false
    }
];

export const getTemplate = (id) => {
    return templates.find(t => t.id === id) || templates[0];
};
