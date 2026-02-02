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
        id: 'earthy',
        name: 'Earthy',
        description: 'Doğal ve organik tasarım',
        preview: 'bg-[#f2efeb]',
        isPremium: false
    }
];

export const getTemplate = (id) => {
    return templates.find(t => t.id === id) || templates[0];
};
