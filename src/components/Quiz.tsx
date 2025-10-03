import { useState } from "react";
import { data } from "../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState<number>(0);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [selected, setSelected] = useState<number | null>(null);

  const question = data[index];

  const checkAnswer = (ans: number) => {
    if (!lock) {
      setSelected(ans);
      if (question.ans === ans) {
        setScore((prev) => prev + 1);
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
      setSelected(null);
    }
  };

  const reset = () => {
    setIndex(0);
    setLock(false);
    setScore(0);
    setResult(false);
    setSelected(null);
  };

  const getOptionClass = (optIndex: number) => {
    if (!lock) {
      return "cursor-pointer p-3 border border-indigo-500/30 rounded-lg bg-black/40 hover:bg-indigo-800/40 hover:scale-105 hover:shadow-[0_0_15px_rgba(129,140,248,0.5)] transition";
    }

    if (selected === optIndex) {
      return question.ans === optIndex
        ? "p-3 border rounded-lg bg-green-600/80 text-white shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-pulse"
        : "p-3 border rounded-lg bg-red-600/80 text-white shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse";
    }

    if (question.ans === optIndex) {
      return "p-3 border rounded-lg bg-green-600/80 text-white shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-pulse";
    }

    return "p-3 border rounded-lg bg-black/40 text-gray-400";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-indigo-950 to-black text-white p-6 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40"></div>

      <div className="relative z-10 bg-black/70 backdrop-blur-xl border border-indigo-500/40 shadow-[0_0_40px_rgba(99,102,241,0.7)] rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-md mb-6">
          🚀 Cosmic Quiz
        </h1>
        <hr className="mb-6 border-indigo-500/30" />
        {result ? (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-semibold text-gray-200">
              🌌 You scored <span className="text-purple-400 font-bold">{score}</span> out of{" "}
              {data.length}
            </h2>
            <button
              onClick={reset}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:scale-105 hover:shadow-[0_0_15px_rgba(167,139,250,0.7)] transition"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-200 mb-4">
              {index + 1}. {question.question}
            </h2>
            <ul className="space-y-3 mb-6">
              <li onClick={() => checkAnswer(1)} className={getOptionClass(1)}>
                {question.option1}
              </li>
              <li onClick={() => checkAnswer(2)} className={getOptionClass(2)}>
                {question.option2}
              </li>
              <li onClick={() => checkAnswer(3)} className={getOptionClass(3)}>
                {question.option3}
              </li>
              <li onClick={() => checkAnswer(4)} className={getOptionClass(4)}>
                {question.option4}
              </li>
            </ul>
            <div className="flex justify-between items-center">
              <button
                onClick={next}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:scale-105 hover:shadow-[0_0_15px_rgba(167,139,250,0.7)] transition"
              >
                Next
              </button>
              <div className="text-gray-400 font-medium">
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
