// Template index - exports all templates
import PlayfulTemplate from './PlayfulTemplate';
import NeumorphicTemplate from './NeumorphicTemplate';

export const templateComponents = {
    'playful': PlayfulTemplate,
    'neumorphic': NeumorphicTemplate,
};

export const getTemplateComponent = (templateId) => {
    return templateComponents[templateId] || PlayfulTemplate;
};

export {
    PlayfulTemplate,
    NeumorphicTemplate,
};
