'use client';

import { useState, useRef, WheelEvent } from 'react';
import { SlideItem } from '../types/slide';
import WheelNavigation from './WheelNavigation';
import styles from './DesktopPage.module.scss';

interface DesktopPageProps {
  slides: Array<SlideItem>;
}

export default function DesktopPage({ slides }: DesktopPageProps) {
  const [stepCount, setStepCount] = useState(0);
  const isLockedRef = useRef(false);
  const total = slides.length;
  const activeIndex = ((stepCount % total) + total) % total;

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    if (isLockedRef.current) return;
    if (Math.abs(event.deltaY) < 20) return;

    isLockedRef.current = true;
    setStepCount((prev) => prev + (event.deltaY > 0 ? 1 : -1));

    // пауза, чтобы один скролл не проматывал по два слайда
    setTimeout(() => {
      isLockedRef.current = false;
    }, 650);
  };

  const handleSelectSlide = (targetIndex: number) => {
    let diff = (targetIndex - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    setStepCount((prev) => prev + diff);
  };

  return (
    <section className={styles.desktopContainer} onWheel={handleWheel}>
      <WheelNavigation
        slides={slides}
        activeIndex={activeIndex}
        stepCount={stepCount}
        onSelectSlide={handleSelectSlide}
      />

      <div className={styles.stage}>
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <article
              key={slide.code}
              className={`${styles.card} ${styles[slide.code]} ${isActive ? styles.activeCard : ''}`}
            >
              <header className={styles.header}>
                <h2
                  className={styles.title}
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />
                <span
                  className={styles.subtitle}
                  dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                />
                <p
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: slide.description }}
                />
              </header>

              {slide.badge && (
                <span
                  className={styles.badge}
                  dangerouslySetInnerHTML={{ __html: slide.badge }}
                />
              )}

              {index === 0 ? (
                <div className={styles.stylerImages}>
                  <div className={styles.sideBox}>
                    {slide.leftItem && (
                      <span
                        className={styles.darkLabel}
                        dangerouslySetInnerHTML={{ __html: slide.leftItem }}
                      />
                    )}
                    <img
                      src="/assets/images/styler1.webp"
                      alt="Фен"
                      className={styles.sideImage}
                    />
                  </div>

                  <div className={styles.centerBox}>
                    <img
                      src="/assets/images/styler2.webp"
                      alt="Фен и стайлер"
                      className={styles.centerImage}
                    />
                  </div>

                  <div className={styles.sideBox}>
                    {slide.rightItem && (
                      <span
                        className={styles.lightLabel}
                        dangerouslySetInnerHTML={{ __html: slide.rightItem }}
                      />
                    )}
                    <img
                      src="/assets/images/styler3.webp"
                      alt="Стайлер"
                      className={styles.sideImage}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.singleImageBox}>
                  <img
                    src={`/assets/images/${slide.code}.webp`}
                    alt={slide.title}
                    className={styles.singleImage}
                  />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}