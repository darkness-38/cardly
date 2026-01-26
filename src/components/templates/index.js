// Template index - exports all templates
import MinimalTemplate from './MinimalTemplate';
import GradientHeroTemplate from './GradientHeroTemplate';
import DarkModeTemplate from './DarkModeTemplate';
import PastelTemplate from './PastelTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import CreativeTemplate from './CreativeTemplate';

export const templateComponents = {
    'minimal': MinimalTemplate,
    'gradient-hero': GradientHeroTemplate,
    'dark-mode': DarkModeTemplate,
    'pastel': PastelTemplate,
    'professional': ProfessionalTemplate,
    'creative': CreativeTemplate,
};

export const getTemplateComponent = (templateId) => {
    return templateComponents[templateId] || MinimalTemplate;
};

export {
    MinimalTemplate,
    GradientHeroTemplate,
    DarkModeTemplate,
    PastelTemplate,
    ProfessionalTemplate,
    CreativeTemplate,
};
