import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const Languages=['en','es','fr'];
i18n
.use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    whitelist:Languages,
 interpolation: {
      escapeValue: false, 
    },
  });


export default i18n;