import { createContext, useContext } from "react";
import { useEffect, useReducer } from "react";

const SECS_PER_QUESTION = 30;

const QuizContext = createContext();

const initState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer": {
      const question = state.questions[state.index];
      const points =
        action.payload === question.correctOption ? state.points + question.points : state.points;

      return { ...state, answer: action.payload, points };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished": {
      const highScore = getHighScore(state.points);
      return { ...state, status: "finished", highScore };
    }
    case "reset":
      return { ...state, status: "ready", index: 0, answer: null, points: 0 };
    case "tick":
      return { ...state };
    default:
      return new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { questions, status, index, answer, points, highScore } = state;
  const question = questions[index];
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, question) => question.points + acc, 0);
  const isFinished = state.index + 1 === numQuestions;
  const secondsRemaining = questions.length * SECS_PER_QUESTION;

  useEffect(function fetchData() {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        dispatch,
        questions,
        question,
        status,
        index,
        answer,
        points,
        highScore,
        numQuestions,
        maxPoints,
        isFinished,
        secondsRemaining,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizState() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("Trying to use QuizState outside the QuizProvider");
  return context;
}

export { QuizProvider, QuizContext, useQuizState };

// HELPERS

function getHighScore(currScore) {
  let highScore;
  const savedScore = Number(JSON.parse(localStorage.getItem("high-score")));
  console.log("savedScore:", savedScore);

  if (!savedScore) highScore = currScore;
  if (currScore <= savedScore) highScore = savedScore;
  else highScore = currScore;

  localStorage.setItem("high-score", highScore);
  return highScore;
}
