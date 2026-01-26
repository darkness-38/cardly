// Template index - exports all templates
import PlayfulTemplate from './PlayfulTemplate';
import BrutalistTemplate from './BrutalistTemplate';

export const templateComponents = {
    'playful': PlayfulTemplate,
    'brutalist': BrutalistTemplate,
};

export const getTemplateComponent = (templateId) => {
    return templateComponents[templateId] || PlayfulTemplate;
};

export {
    PlayfulTemplate,
    BrutalistTemplate,
};
