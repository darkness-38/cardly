// Template index - exports all templates
import PlayfulTemplate from './PlayfulTemplate';
import EarthyTemplate from './EarthyTemplate';

export const templateComponents = {
    'playful': PlayfulTemplate,
    'earthy': EarthyTemplate,
};

export const getTemplateComponent = (templateId) => {
    return templateComponents[templateId] || PlayfulTemplate;
};

export {
    PlayfulTemplate,
    EarthyTemplate,
};
