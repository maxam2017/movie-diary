import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en-US', () => import('../locales/en-US.json'));
register('zh-TW', () => import('../locales/zh-TW.json'));

init({
  fallbackLocale: 'en-US',
  initialLocale: getLocaleFromNavigator(),
});
