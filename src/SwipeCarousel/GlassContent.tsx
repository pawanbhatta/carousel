import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";

const styles = {
  glass:
    " bg-[rgba(250,_154,_126,_0.3)] rounded-[16px] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1),_inset_7px_5px_3px_-3px_#fff9,_inset_5px_5px_10px_-3px_#fff6,_inset_-5px_-5px_10px_-3px_#0006] backdrop-filter backdrop-blur-[7.7px]",
  background:
    " h-screen w-screen flex items-center justify-center bg-[radial-gradient(_circle_at_0_0,_rgba(203,_173,_10,_0.8),_rgba(203,_10,_93,_0.72)_30%_50%,_rgba(181,_10,_203,_0.95)_80%_)] p-[20px]",
  box: " h-[450px] w-[450px] flex flex-col items-center justify-start",
  innerUpperBox: " h-2/5 w-full",
  innerContentWrapper:
    " flex items-center justify-center gap-[20px] mt-[40px] w-full",
  innerCircle: " h-[60px] w-[60px] rounded-[50%] border-[5px]",
  contentWrapper: " w-4/5 flex flex-col gap-[10px]",
  innerUpperContent: " h-[30px] w-full border-[5px] rounded-[10px]",
  innerLowerContent: " h-[20px] w-1/2 border-[5px]",
};

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 1000;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 1,
  stiffness: 200,
  damping: 30,
};

const GlassContent = ({
  imgIndex,
  setImgIndex,
  imgs,
  idx,
}: {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
  imgs: any;
  idx: number;
}) => {
  return (
    <motion.div
      style={
        {
          // backgroundImage: `url(${imgSrc})`,
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // height: "400px",
          // width: "400px",
        }
      }
      animate={{
        scale: imgIndex === idx || imgIndex === imgs.length ? 0.95 : 0.65,
      }}
      transition={SPRING_OPTIONS}
      className={`${styles.glass} ${styles.box}`}
      // className="bg-[rgba(250,_154,_126,_0.3)] rounded-[16px] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1),_inset_7px_5px_3px_-3px_#fff9,_inset_5px_5px_10px_-3px_#fff6,_inset_-5px_-5px_10px_-3px_#0006] backdrop-filter backdrop-blur-[7.7px] h-[450px] w-[450px] flex flex-col items-center justify-start"
      onClick={() =>
        idx === 0 ? setImgIndex(imgs.length - 1) : setImgIndex(idx)
      }
    >
      <div className={styles.glass + styles.innerUpperBox}> </div>

      <div className={styles.innerContentWrapper}>
        <div className={`${styles.glass} ${styles.innerCircle}`}></div>
        <div className={styles.contentWrapper}>
          <div className={`${styles.glass} ${styles.innerUpperContent}`}></div>
          <div className={`${styles.glass} ${styles.innerLowerContent}`}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default GlassContent;
