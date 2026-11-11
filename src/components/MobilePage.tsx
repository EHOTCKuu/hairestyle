import { SlideItem } from '../types/slide';
import styles from './MobilePage.module.scss';

interface MobilePageProps {
  slides: Array<SlideItem>;
}

export default function MobilePage({ slides }: MobilePageProps) {
  return (
    <div className={styles.mobileContainer}>
      {slides.map((slide, index) => (
        <section
          key={slide.code}
          className={`${styles.section} ${styles[slide.code]}`}
        >
          {index > 0 && (
            <div className={styles.dividerPill}>
              <img
                src={`/assets/icons/${slide.code}Mobile.svg`}
                alt=""
                className={styles.dividerIcon}
              />
              <span
                className={styles.dividerText}
                dangerouslySetInnerHTML={{
                  __html: slide.navTitleMobile || slide.title,
                }}
              />
            </div>
          )}

          {slide.code === 'styler' && (
            <>
              <div className={styles.stylerHero}>
                <img
                  src="/assets/images/styler2Mobile.webp"
                  alt={slide.title}
                  className={styles.stylerBgImg}
                />
                <header className={styles.stylerHeader}>
                  <h2
                    className={styles.stylerTitle}
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  />
                  <span
                    className={styles.stylerSubtitle}
                    dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                  />
                </header>
              </div>

              <div className={styles.stylerCards}>
                <div className={styles.stylerCard}>
                  {slide.leftItem && (
                    <span
                      className={styles.darkLabel}
                      dangerouslySetInnerHTML={{ __html: slide.leftItem }}
                    />
                  )}
                  <img
                    src="/assets/images/styler1Mobile.webp"
                    alt="Фен"
                    className={styles.sideImg}
                  />
                </div>

                <div className={styles.stylerCard}>
                  {slide.rightItem && (
                    <span
                      className={styles.lightLabel}
                      dangerouslySetInnerHTML={{ __html: slide.rightItem }}
                    />
                  )}
                  <img
                    src="/assets/images/styler3Mobile.webp"
                    alt="Стайлер"
                    className={styles.sideImg}
                  />
                </div>
              </div>
            </>
          )}

          {slide.code === 'feather' && (
            <>
              <header className={styles.featherHeader}>
                <h2
                  className={styles.featherTitle}
                  dangerouslySetInnerHTML={{ __html: slide.navTitle }}
                />
                <span
                  className={styles.featherSubtitle}
                  dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                />
              </header>

              <div className={styles.featherVisual}>
                {slide.badge && (
                  <span
                    className={styles.badge}
                    dangerouslySetInnerHTML={{ __html: slide.badge }}
                  />
                )}
                <img
                  src="/assets/images/featherMobile.webp"
                  alt={slide.navTitle}
                  className={styles.featherImg}
                />
              </div>

              <p
                className={styles.featherDesc}
                dangerouslySetInnerHTML={{ __html: slide.description }}
              />
            </>
          )}

          {slide.code === 'motor' && (
            <>
              <header className={styles.motorHeader}>
                <h2
                  className={styles.motorTitle}
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />
              </header>

              <div className={styles.motorCard}>
                <span
                  className={styles.motorSubtitle}
                  dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                />
                <img
                  src="/assets/images/motorMobile.webp"
                  alt={slide.title}
                  className={styles.motorImg}
                />
              </div>

              {slide.badge && (
                <span
                  className={styles.badge}
                  dangerouslySetInnerHTML={{ __html: slide.badge }}
                />
              )}
            </>
          )}
        </section>
      ))}
    </div>
  );
}