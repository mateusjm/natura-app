import { motion } from "framer-motion";
import macbookImg from "../../../assets/macbook.png";

const FLOAT_TRANSITION = {
  duration: 5,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export default function HeroMacbookMockup() {
  return (
    <div className="relative mx-auto flex w-full justify-center overflow-visible py-12">
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -12, 0] }}
        transition={FLOAT_TRANSITION}
      >
        <div
          className="
            relative
            w-[750px]
            max-w-none
            scale-95
            lg:scale-100
            origin-center
            [transform:perspective(1800px)_rotateY(-8deg)_rotateX(3deg)]
          "
        >
          <img
            src={macbookImg}
            alt="MacBook mostrando o Natura App"
            className="relative z-10 block w-full select-none"
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  );
}
