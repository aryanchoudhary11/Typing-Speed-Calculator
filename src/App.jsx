import { useCallback, useEffect } from "react";
import { useState, useRef } from "react";

function App() {
  let sentence = "The quick brown fox jumps over the lazy dog";
  const [text, settext] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    if (text.length === 1 && !startTime) {
      setStartTime(Date.now());
      setIsRunning(true);
    }
    if (text.length === sentence.length) {
      setEndTime(Date.now());
      setIsRunning(false);
      setIsCorrect(text === sentence);
    }
  }, [text]);

  useEffect(() => {
    if (startTime && endTime) {
      const timeTaken = (endTime - startTime) / 1000 / 60;
      const wordCount = sentence.split(" ").length;
      const speed = Math.round(wordCount / timeTaken);
      setWpm(speed);
    }
  }, [startTime, endTime]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const reset = useCallback(() => {
    settext("");
    setStartTime(null);
    setEndTime(null);
    setIsRunning(false);
    setWpm(null);
    setIsCorrect(null);
    inputRef.current.focus();
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-700 px-2 py-4 flex items-center justify-center flex-col w-1/2">
        <h1 className="font-bold text-xl mb-4">Typing Speed Tester</h1>
        <h2 className="mb-4 text-green-500">Sentence: "{sentence}"</h2>
        <input
          type="text"
          placeholder="Type here..."
          className="border-1 rounded-xl w-1/2 h-10 px-2 mb-10 w-full sm:w-2/3 md:w-1/2 lg:w-1/2"
          ref={inputRef}
          value={text}
          onChange={(e) => settext(e.target.value)}
          disabled={text === sentence}
        />
        <div className="flex gap-10 mb-10">
          <button
            className="outline-none bg-red-600 text-white rounded-xl w-20 h-8 hover:bg-red-500 cursor-pointer"
            onClick={reset}
          >
            Restart
          </button>
        </div>
        <h2>Speed: {wpm} WPM</h2>
        {isCorrect !== null && (
          <h2
            className={`font-semibold text-lg mt-4 ${
              isCorrect ? "text-green-400" : "text-red-500"
            }`}
          >
            {isCorrect
              ? "Perfect! Sentence is correct ✅"
              : "Oops! Sentence is incorrect ❌"}
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
