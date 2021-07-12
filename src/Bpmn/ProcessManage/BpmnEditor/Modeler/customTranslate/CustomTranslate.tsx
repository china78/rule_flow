import translations from './TranslationsGerman';

export default function customTranslate(template: any, replacements: any) {
  const isReplacements = replacements || {};

  // Translate
  const isTemplate = translations[template] || template;

  // Replace
  return isTemplate.replace(/{([^}]+)}/g, (_: any, key: any) => {
    return isReplacements[key] || `{${key}}`;
  });
}
