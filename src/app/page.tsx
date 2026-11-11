import slidesData from '../data/slidesData.json';
import { SlideItem } from '../types/slide';
import DesktopPage from '../components/DesktopPage';
import MobilePage from '../components/MobilePage';
import styles from './page.module.scss';

export default function HomePage() {
  const slides = slidesData as Array<SlideItem>;

  return (
    <main className={styles.main}>
      <div className={styles.desktopView}>
        <DesktopPage slides={slides} />
      </div>
      <div className={styles.mobileView}>
        <MobilePage slides={slides} />
      </div>
    </main>
  );
}