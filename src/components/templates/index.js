// Template index - exports all templates
import PlayfulTemplate from './PlayfulTemplate';
import NeumorphicTemplate from './NeumorphicTemplate';
import BrutalistTemplate from './BrutalistTemplate';

export const templateComponents = {
    'playful': PlayfulTemplate,
    'neumorphic': NeumorphicTemplate,
    'brutalist': BrutalistTemplate,
};

export const getTemplateComponent = (templateId) => {
    return templateComponents[templateId] || PlayfulTemplate;
};

export {
    PlayfulTemplate,
    NeumorphicTemplate,
    BrutalistTemplate,
};
