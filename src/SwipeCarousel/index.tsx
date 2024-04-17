import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const imgs = ["a", "b", "c", "d", "e", "f", "g", "h"];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 1000;
const DRAG_BUFFER = 30;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 1,
  stiffness: 500,
  damping: 50,
};

export const SwipeCarousel = () => {
  const [imgIndex, setImgIndex] = useState(1);

  const dragY = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const y = dragY.get();
      if (y === 0) {
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
    const y = dragY.get();

    if (y <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (y >= DRAG_BUFFER && imgIndex === 1) {
      setImgIndex(imgs.length - 1);
    } else if (y >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    } else if (y >= DRAG_BUFFER && imgIndex === 0) {
      setImgIndex(imgs.length - 1);
    } else {
      setImgIndex(1);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-[radial-gradient(_circle_at_0_0,_rgba(203,_173,_10,_0.8),_rgba(203,_10,_93,_0.72)_30%_50%,_rgba(181,_10,_203,_0.95)_80%_)]">
      <motion.div
        drag="y"
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        style={{
          y: dragY,
        }}
        animate={{
          translateY: `-${(imgIndex - 1) * 450}px`,
          // translateY: `-${
          //   imgIndex === 0 ? (imgs.length - 2) * 400 : (imgIndex - 1) * 400
          // }px`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center justify-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} setImgIndex={setImgIndex} />
      </motion.div>
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
      className="flex-col w-screen items-center justify-center"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: -150,
      }}
    >
      {imgs.map((_, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              marginBottom: idx === imgIndex + 1 ? "100px" : "0px",
            }}
            animate={{
              scale: imgIndex === idx || imgIndex === imgs.length ? 0.95 : 0.65,
              opacity:
                imgIndex === idx || imgIndex === imgs.length ? 0.95 : 0.55,
            }}
            transition={SPRING_OPTIONS}
            className="bg-[rgba(250,_154,_126,_0.3)] rounded-[16px] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1),_inset_7px_5px_3px_-3px_#fff9,_inset_5px_5px_10px_-3px_#fff6,_inset_-5px_-5px_10px_-3px_#0006] backdrop-filter backdrop-blur-[7.7px] h-[450px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-[450px] xs:h-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] flex flex-col items-center justify-start p-5"
            onClick={() =>
              idx === 0 ? setImgIndex(imgs.length - 1) : setImgIndex(idx)
            }
          >
            <div className="bg-[rgba(250,_154,_126,_0.3)] rounded-[16px] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1),_inset_7px_5px_3px_-3px_#fff9,_inset_5px_5px_10px_-3px_#fff6,_inset_-5px_-5px_10px_-3px_#0006] backdrop-filter backdrop-blur-[7.7px] h-2/5 w-full"></div>

            <div className="flex items-center justify-center gap-[20px] mt-[40px] w-full">
              <div className="bg-[rgba(250,_154,_126,_0.3)] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1),_inset_7px_5px_3px_-3px_#fff9,_inset_5px_5px_10px_-3px_#fff6,_inset_-5px_-5px_10px_-3px_#0006] backdrop-filter backdrop-blur-[7.7px] h-[60px] xs:h-[30px] sm:h-[40px] md:h-[50px] lg:h-[60px] w-[60px] xs:w-[30px] sm:w-[40px] md:w-[50px] lg:w-[60px] rounded-[50%] border-[1px]"></div>
              <div className="w-4/5 flex flex-col gap-[10px]">
                <div className="bg-[rgba(250,_154,_126,_0.3)] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1),_inset_7px_5px_3px_-3px_#fff9,_inset_5px_5px_10px_-3px_#fff6,_inset_-5px_-5px_10px_-3px_#0006] backdrop-filter backdrop-blur-[7.7px] h-[30px] w-full border-[1px] rounded-[10px]"></div>
                <div className="bg-[rgba(250,_154,_126,_0.3)] rounded-[16px] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1),_inset_7px_5px_3px_-3px_#fff9,_inset_5px_5px_10px_-3px_#fff6,_inset_-5px_-5px_10px_-3px_#0006] backdrop-filter backdrop-blur-[7.7px] h-[20px] w-1/2 border-[1px]"></div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
