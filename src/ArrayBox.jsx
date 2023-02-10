import React from "react";
import { motion } from "framer-motion";
import ArrowIcon from "./assets/icons8.png";

const ArrayBox = ({
  value,
  buttonClick,
  sum,
  left,
  right,
  variants,
  onChange,
}) => {
  const divArrayBoxClassName = `border-red-300 border-2 h-[6vh] md:w-[6vw] w-[10vw]  m-5 rounded-md flex flex-col items-center justify-center`;
  return (
    <div className="flex flex-col items-center justify-center w-[100%]">
      <motion.div
        variants={variants}
        initial={buttonClick ? "rotatehalf" : "initial"}
        animate={buttonClick ? "rotatefull" : "animate"}
        transition={{ duration: 0.3 }}
        whileTap={
          !buttonClick
            ? {
                scale: 0,
              }
            : {}
        }
        className={divArrayBoxClassName}
      >
        <input
          type="text"
          className="text-center text-light font-mono outline-0 text-2xl mx-auto w-[100%]  "
          value={value}
          onChange={onChange && !buttonClick ? onChange : () => {}}
        />
      </motion.div>
      {!sum && (left || right) && buttonClick && (
        <>
          <img src={ArrowIcon} alt="" />
          <h3 className="font-mono font-extralight">{left && "Left"}</h3>
          <h3 className="font-mono font-extralight">{right && "Right"}</h3>
        </>
      )}
    </div>
  );
};

export default ArrayBox;
