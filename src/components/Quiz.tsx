import { useRef, useState } from "react";
import { data } from "../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState<number>(0);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef<HTMLLIElement>(null);
  let Option2 = useRef<HTMLLIElement>(null);
  let Option3 = useRef<HTMLLIElement>(null);
  let Option4 = useRef<HTMLLIElement>(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const question = data[index];

  const checkAnswer = (e: React.MouseEvent<HTMLLIElement>, ans: number) => {
    if (!lock) {
      if (question.ans === ans) {
        e.currentTarget.classList.add("bg-green-500", "text-white");
        setScore((prev) => prev + 1);
      } else {
        e.currentTarget.classList.add("bg-red-500", "text-white");
        option_array[question.ans - 1].current?.classList.add("bg-green-500", "text-white");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prev) => prev + 1);
      setLock(false);
      option_array.forEach((option) => {
        option.current?.classList.remove("bg-green-500", "bg-red-500", "text-white");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setLock(false);
    setScore(0);
    setResult(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Five Eyes Quiz</h1>
        <hr className="mb-6 border-gray-300" />
        {result ? (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              🎉 You scored <span className="text-indigo-600">{score}</span> out of {data.length}
            </h2>
            <button
              onClick={reset}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Reset
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {index + 1}. {question.question}
            </h2>
            <ul className="space-y-3 mb-6">
              <li
                ref={Option1}
                onClick={(e) => checkAnswer(e, 1)}
                className="cursor-pointer p-3 border rounded-lg hover:bg-indigo-100 transition"
              >
                {question.option1}
              </li>
              <li
                ref={Option2}
                onClick={(e) => checkAnswer(e, 2)}
                className="cursor-pointer p-3 border rounded-lg hover:bg-indigo-100 transition"
              >
                {question.option2}
              </li>
              <li
                ref={Option3}
                onClick={(e) => checkAnswer(e, 3)}
                className="cursor-pointer p-3 border rounded-lg hover:bg-indigo-100 transition"
              >
                {question.option3}
              </li>
              <li
                ref={Option4}
                onClick={(e) => checkAnswer(e, 4)}
                className="cursor-pointer p-3 border rounded-lg hover:bg-indigo-100 transition"
              >
                {question.option4}
              </li>
            </ul>
            <div className="flex justify-between items-center">
              <button
                onClick={next}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Next
              </button>
              <div className="text-gray-600 font-medium">
                {index + 1} of {data.length} questions
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
