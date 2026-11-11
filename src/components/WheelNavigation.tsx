import { SlideItem } from '../types/slide';
import styles from './WheelNavigation.module.scss';

interface WheelNavigationProps {
  slides: Array<SlideItem>;
  activeIndex: number;
  stepCount: number;
  onSelectSlide: (index: number) => void;
}

const SLOTS = 21;
const ANGLE_STEP = 360 / SLOTS;

export default function WheelNavigation({
  slides,
  activeIndex,
  stepCount,
  onSelectSlide,
}: WheelNavigationProps) {
  const wheelAngle = -stepCount * ANGLE_STEP;
  const items = [...Array(SLOTS).keys()];

  return (
    <nav className={styles.wheelWrapper}>
      <div
        className={styles.orbitCircle}
        style={{ transform: `rotate(${wheelAngle}deg)` }}
      >
        {items.map((slotIndex) => {
          const slideIndex = slotIndex % slides.length;
          const slide = slides[slideIndex];
          const itemAngle = slotIndex * ANGLE_STEP;
          const totalAngle = itemAngle + wheelAngle;
          const signed = ((((totalAngle + 180) % 360) + 360) % 360) - 180;
          const isVisible = Math.abs(signed) <= ANGLE_STEP + 1;
          const isActive = slideIndex === activeIndex && Math.abs(signed) < 2;
          const icon = isActive ? slide.code : `${slide.code}Off`;

          return (
            <div
              key={slotIndex}
              className={`${styles.orbitItem} ${!isVisible ? styles.hiddenItem : ''}`}
              style={{ transform: `rotate(${itemAngle}deg)` }}
            >
              <button
                type="button"
                onClick={() => onSelectSlide(slideIndex)}
                className={`${styles.itemButton} ${isActive ? styles.active : ''}`}
                style={{ transform: `rotate(${-totalAngle}deg)` }}
              >
                <img
                  src={`/assets/icons/${icon}.svg`}
                  alt={slide.title}
                  className={styles.iconImage}
                />
                {isActive && (
                  <span
                    className={styles.itemLabel}
                    dangerouslySetInnerHTML={{
                      __html: slide.navTitle || slide.title,
                    }}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}