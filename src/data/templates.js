// Template definitions
export const templates = [
    {
        id: 'playful',
        name: 'Playful',
        description: 'Eğlenceli ve dinamik tasarım',
        preview: 'bg-amber-50',
        isPremium: false
    }
];

export const getTemplate = (id) => {
    return templates.find(t => t.id === id) || templates[0];
};
