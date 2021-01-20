import I18n from 'i18n-js';
import en from './Locales/en';

export function initI18n() {
  I18n.fallbacks = true;
  I18n.translations = {
    en,
  };
}

// The method we'll use instead of a regular string
export function strings(name: string, params = {}) {
  const str = I18n.t(name, params);
  return str;
}

export default I18n;
