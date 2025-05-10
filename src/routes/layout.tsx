import { Outlet } from '@modern-js/runtime/router';

import styles from './layout.module.scss';
import '../global.css';

function Layout(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.header}>比亚迪 OTA 验证码查询工具</div>
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
