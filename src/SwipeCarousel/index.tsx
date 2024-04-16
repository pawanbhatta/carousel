import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const imgs = [
  "/src/assets/KarkhanaFeature.jpg",
  "/src/assets/KarkhanaFeature.jpg",
  "/src/assets/KarkhanaFeature.jpg",
  "/src/assets/KarkhanaFeature.jpg",
  "/src/assets/KarkhanaFeature.jpg",
  "/src/assets/KarkhanaFeature.jpg",
  "/src/assets/KarkhanaFeature.jpg",
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 5,
  stiffness: 500,
  damping: 50,
};

export const SwipeCarousel = () => {
  const [imgIndex, setImgIndex] = useState(1);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === imgs.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex === 1) {
      setImgIndex(imgs.length - 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    } else if (x >= DRAG_BUFFER && imgIndex === 0) {
      setImgIndex(imgs.length - 1);
    } else {
      setImgIndex(1);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-0">
      <motion.div
        drag="y"
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        style={{
          y: dragX,
        }}
        animate={{
          translateY: `-${
            imgIndex === 0 ? (imgs.length - 2) * 400 : (imgIndex - 1) * 400
          }px`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center justify-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} setImgIndex={setImgIndex} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      <GradientEdges />
    </div>
  );
};

const Images = ({
  imgIndex,
  setImgIndex,
}: {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div
      className="flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-screen items-center justify-center"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {imgs.map((_, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              // backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "400px",
              width: "400px",
            }}
            animate={{
              scale: imgIndex === idx || imgIndex === imgs.length ? 0.95 : 0.65,
            }}
            transition={SPRING_OPTIONS}
            className="aspect-video shrink-0 rounded-xl bg-neutral-800 object-cover text-yellow-100 flex items-center justify-center font-extrabold text-3xl"
            onClick={() =>
              idx === 0 ? setImgIndex(imgs.length - 1) : setImgIndex(idx)
            }
          >
            {idx + 1}
          </motion.div>
        );
      })}
    </div>
  );
};

const Dots = ({
  imgIndex,
  setImgIndex,
}: {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {imgs.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
            }`}
          />
        );
      })}
    </div>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};
