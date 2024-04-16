import * as React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { debounce } from "lodash";
export interface ICarouselProps {}

function Card() {
  return <div className={styles.cardItem}></div>;
}

export function Carousel(props: ICarouselProps) {
  const vCarousel = React.useRef<HTMLDivElement | null>(null);
  const carouselItems = ["a", "b", "c", "d", "e", "f", "g"];
  const [active, setActive] = React.useState(0);
  const prev = () => {
    console.log("Previous ", active);
    if (active <= 0) setActive(carouselItems.length - 1);
    else setActive((a) => a - 1);
  };
  const next = () => {
    console.log("next ", active);

    if (active >= carouselItems.length - 1) setActive(0);
    else setActive((a) => a + 1);
  };
  const resetCarousel = () => {
    if (vCarousel.current) {
      vCarousel.current.childNodes.forEach((c) => {
        if (c instanceof HTMLElement) {
          if (c.classList.contains(styles.active)) {
            c.style.height = "300px";
            c.style.marginBlock = "10px";
            if (c === vCarousel.current?.firstChild)
              c.style.marginTop = "110px";
            if (c === vCarousel.current?.lastChild)
              c.style.marginBottom = "110px";
          }
          if (c.classList.contains(styles.beforeActive)) {
            c.style.height = "100px";
            c.style.marginBlock = "10px";
          }
          if (c.classList.contains(styles.afterActive)) {
            c.style.height = "110px";
            c.style.marginBlock = "10px";
          }
          if (c.classList.contains(styles.inactive)) {
            c.style.height = "0px";
            c.style.margin = "0px";
          }
        }
      });
    }
  };
  React.useEffect(() => {
    let dragState = false;
    let dragPosition = { x: 0, y: 0 };
    let center = {
      x: 0,
      y: 0,
    };
    function activateDrag(event: MouseEvent) {
      dragState = true;
      dragPosition = { x: event.clientX, y: event.clientY };
      if (vCarousel.current) {
        vCarousel.current.childNodes.forEach((c) => {
          if (c instanceof HTMLElement && c.style) c.style.transition = "";
        });
      }
    }
    function deactivateDrag(event: MouseEvent) {
      dragState = false;
      if (vCarousel.current) {
        vCarousel.current.childNodes.forEach((c) => {
          if (c instanceof HTMLElement && c.style)
            c.style.transition = "all 0.3s ease-in-out";
        });
      }
      if (event.clientY - dragPosition.y > 200) prev();
      else if (event.clientY - dragPosition.y < -200) next();
      else resetCarousel();
    }
    const handleDrag = debounce((event: MouseEvent) => {
      event.preventDefault();
      if (dragState && vCarousel.current) {
        // console.log(event);
        const activeItem = vCarousel.current.querySelector(`.${styles.active}`);
        const beforeItem = vCarousel.current.querySelector(
          `.${styles.beforeActive}`
        );
        const afterItem = vCarousel.current.querySelector(
          `.${styles.afterActive}`
        );
        // console.log(activeItem?.style);
        if (activeItem instanceof HTMLDivElement) {
          if (activeItem === vCarousel.current.firstChild) {
            const height = Math.abs(event.clientY - dragPosition.y);
            activeItem.style.marginTop = 110 - height / 2 + "px";
            // console.log("First is ACTIVE", event.clientY, dragPosition.y);
          } else {
            const height = Math.abs(event.clientY - dragPosition.y);
            activeItem.style.height = 500 - height + "px";
          }
        }
        if (beforeItem instanceof HTMLDivElement) {
          const height = event.clientY - dragPosition.y;
          beforeItem.style.height = 300 + height + "px";
        }
        if (afterItem instanceof HTMLDivElement) {
          const height = event.clientY - dragPosition.y;
          afterItem.style.height = 300 - height + "px";
        }
      }
    }, 1);
    if (vCarousel.current) {
      center = {
        x: vCarousel.current.clientWidth,
        y: vCarousel.current.clientHeight,
      };
      vCarousel.current.addEventListener("mousedown", activateDrag);
      document.addEventListener("mouseup", deactivateDrag);
      document.addEventListener("mousemove", handleDrag);
    }
    return () => {
      vCarousel.current?.removeEventListener("mousedown", activateDrag);
      document.removeEventListener("mouseup", deactivateDrag);
      document.removeEventListener("mousemove", handleDrag);
    };
  }, []);

  console.log("active outside : ", active);
  React.useEffect(resetCarousel, [active]);

  return (
    <>
      <div className={styles.carousel} ref={vCarousel} draggable={false}>
        {carouselItems.map((c, i) => (
          <div
            draggable={false}
            key={i}
            className={clsx({
              [styles.active]: i === active,
              [styles.carouselItem]: true,
              [styles.beforeActive]: i === active - 1,
              [styles.afterActive]: i === active + 1,
              [styles.inactive]: i < active - 1 || i > active + 1,
            })}
          >
            <div className={styles.cardItem}>{c}</div>
          </div>
        ))}
      </div>
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
    </>
  );
}
