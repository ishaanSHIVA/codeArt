import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import addNotify from "./assets/add.mp3";
import subtractNotify from "./assets/subtract.mp3";
import foundNotify from "./assets/found.mp3";
import NotfoundNotify from "./assets/notfound.mp3";
import ArrayBox from "./ArrayBox";
import useInterval from "./useInterval";

const variants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
  },
  rotatehalf: {
    rotate: 180,
  },
  rotatefull: {
    rotate: 360,
  },
  headRotate: { rotate: 180, scale: 0 },
  headAnimate: { rotate: 0, scale: 1 },
};

const App = () => {
  const [array, setArray] = useState([3, 5, -4, 8, 5, 1, -1, 6]);
  const [string, setString] = useState("two number sum in array");
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(array.length - 1);
  const [buttonClick, setButtonClick] = useState(false);
  const [targetSum, setTargetSum] = useState(5);
  const [compare, setCompare] = useState();
  const [addNumber, setAddNumber] = useState("+");
  const addAudio = new Audio(addNotify);
  const subtractAudio = new Audio(subtractNotify);
  const foundAudio = new Audio(foundNotify);
  const NotfoundAudio = new Audio(NotfoundNotify);
  const [isRunning, setIsRunning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const handleStartButton = () => {
    setString("sorting the array...");
    setButtonClick(true);
    setArray(
      [...array].sort(function (a, b) {
        return a - b;
      })
    );
  };
  const handleArrayChange = () => {
    if (buttonClick) {
      if (array[right] + array[left] == targetSum) {
        foundAudio.play();
        setIsRunning(false);
        setCompare("=");
        setString("solved");
        setIsFinished(true);
      } else if (array[right] + array[left] < targetSum) {
        setString(`left must increase`);

        if (left + 1 !== right) {
          setLeft(left + 1);
          setCompare("<");
          addAudio.play();
        }
      } else {
        setString(`right must decease`);
        if (left !== right - 1) {
          setRight(right - 1);
          setCompare(">");
          subtractAudio.play();
        }
      }
      if (
        (right <= left + 1 || left + 1 >= right) &&
        array[right] + array[left] != targetSum
      ) {
        setIsRunning(false);
        NotfoundAudio.play();
        setString("not found");
        setIsFinished(true);
      }
    }
  };
  useInterval(handleArrayChange, isRunning ? 2000 : null);

  const handleAddNumber = () => {
    if (Number(addNumber)) {
      let newArray = [...array, Number(addNumber)];
      setRight(newArray.length - 1);
      setArray(newArray);
      setAddNumber("+");
    }
  };

  useEffect(() => {
    console.log(left, right);
  }, [left, right]);

  return (
    <div className="font-mono container mx-auto flex-col w-[100%] flex justify-center items-center">
      <div className="w-[100vw] h-[20vh] flex justify-center items-center">
        <motion.h1
          variants={variants}
          initial={buttonClick ? "rotatehalf" : ""}
          animate={buttonClick ? "rotatefull" : ""}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="font-mono text-5xl font-light"
        >
          {string}
        </motion.h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="">
          <div className="">Total Sum</div>
          <ArrayBox
            sum={true}
            value={targetSum}
            variants={variants}
            onChange={(e) => {
              if (!buttonClick) {
                setTargetSum(e.target.value);
              }
            }}
          />
        </div>

        {buttonClick && (
          <>
            <div className="">
              <div className="">Compare</div>
              <ArrayBox
                className="pt-3 bg-blue-300"
                sum={true}
                value={compare}
                variants={variants}
              />
            </div>
            <div className="">
              <div className="mx-4">Sum </div>
              <ArrayBox
                sum={true}
                value={Number(array[left]) + Number(array[right])}
                variants={variants}
              />
            </div>
          </>
        )}
      </div>
      <div className="">Array</div>
      <motion.div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
        {array.map((number, index) => (
          <ArrayBox
            value={number}
            buttonClick={buttonClick}
            left={index == left}
            right={index == right}
            variants={variants}
            onChange={(e) => {
              let newArray = [...array];
              newArray[index] = e.target.value;
              setArray(newArray);
            }}
          />
        ))}
        {!buttonClick && (
          <ArrayBox
            value={addNumber}
            onChange={(e) => {
              if (addNumber === "+") {
                setAddNumber(" ");
              } else {
                setAddNumber(e.target.value);
              }
            }}
          />
        )}
      </motion.div>
      {!buttonClick ? (
        <>
          <button
            className="button-3 mt-3 text-3xl"
            onClick={handleStartButton}
            role="button"
          >
            Start
          </button>
          <button
            className="button-3 mt-3 text-3xl"
            onClick={handleAddNumber}
            role="button"
          >
            Add
          </button>
        </>
      ) : (
        <>
          <button
            className="button-3 mt-3 text-3xl"
            onClick={
              isFinished
                ? () => {
                    setButtonClick(false);
                    setString("two number sum in array");
                    setLeft(0);
                    setRight(array.length - 1);
                    setIsRunning(true);
                    setIsFinished(false);
                  }
                : () => {
                    setIsRunning(!isRunning);
                  }
            }
            role="button"
          >
            {isRunning && "Pause"}
            {isFinished && "Play Again"}
            {!isRunning && !isFinished && "Play"}
          </button>
        </>
      )}
      <h3 className="pt-5">Made with ❤️ by </h3>
      <a
        className="text-blue-400"
        target={"_blank"}
        href="https://www.linkedin.com/in/ishaan-rajpal-6a3834244/"
      >
        Ishaan
      </a>
    </div>
  );
};

export default App;
