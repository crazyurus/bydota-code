import { useLocation, useNavigate, Outlet } from '@modern-js/runtime/router';
import { Helmet } from '@modern-js/runtime/head';
import { TabPane, Tabs, Typography } from '@douyinfe/semi-ui';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';

import en from '../locales/en.json';
import zh from '../locales/zh.json';
import ru from '../locales/ru.json';

import styles from './layout.module.scss';
import '../global.css';

const TUTORIAL_URL =
  'https://docs.qq.com/aio/p/sc8axhs28s5bis8?p=Clj1XBwnQF9nFLyuSOK6zB';
const DOWNLOAD_URL = 'https://pan.quark.cn/s/5d503c2600f0';

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
  const navigate = useNavigate();
  const location = useLocation();
  const activeKey = location.pathname.slice(1);

  const handleChange = (tab: string) => {
    navigate(`/${tab}`, {
      replace: true,
    });
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <div className={styles.header}>{t('title')}</div>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.tutorial}>
            <div className={styles.line}>
              <span>{t('tutorial.collection')}</span>
              <Typography.Text
                link={{
                  href: TUTORIAL_URL,
                  target: '_blank',
                }}
              >
                {TUTORIAL_URL}
              </Typography.Text>
            </div>
            <div className={styles.line}>
              <span>{t('tutorial.download')}</span>
              <Typography.Text
                link={{
                  href: DOWNLOAD_URL,
                  target: '_blank',
                }}
              >
                {DOWNLOAD_URL}
              </Typography.Text>
            </div>
          </div>
          <Tabs activeKey={activeKey} type="line" onChange={handleChange}>
            <TabPane tab={t('tab.record')} itemKey="record" />
            <TabPane tab={t('tab.code')} itemKey="code" />
          </Tabs>
          <Outlet />
        </div>
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
