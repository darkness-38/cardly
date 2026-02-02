// Template index - exports all templates
import PlayfulTemplate from './PlayfulTemplate';

export const templateComponents = {
    'playful': PlayfulTemplate,
};

export const getTemplateComponent = (templateId) => {
    return templateComponents[templateId] || PlayfulTemplate;
};

export {
    PlayfulTemplate,
};
