import { Outlet } from '@modern-js/runtime/router';
import { Helmet } from '@modern-js/runtime/head';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import en from '../locales/en.json';
import zh from '../locales/zh.json';
import ru from '../locales/ru.json';

import styles from './layout.module.scss';
import '../global.css';

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
      ru: {
        translation: ru,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

function Layout(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <div className={styles.header}>{t('title')}</div>
      <div className={styles.body}>
        <Outlet />
      </div>
      <footer
        className={styles.footer}
        onClick={() => window.open('https://crazyurus.com/')}
      >
        &copy; Cr4zy Uru5
      </footer>
    </div>
  );
}

export default Layout;
