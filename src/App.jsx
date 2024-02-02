import { useEffect, useReducer } from "react";

import Header from "./Components/Header.jsx";
import MainBody from "./Components/MainBody.jsx";
import Loader from "./Components/Loader.jsx";
import Error from "./Components/Error.jsx";
import StartScreen from "./Components/StartScreen.jsx";
import Question from "./Components/Question.jsx";
import NextButton from "./Components/NextButton.jsx";
import Options from "./Components/Options";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen.jsx";
import Timer from "./Components/Timer.jsx";

const SECS_PER_QUESTION = 30;

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
      const points = action.payload === question.correctOption ? state.points + question.points : state.points;

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

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { questions, status, index, answer, points, highScore } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, question) => question.points + acc, 0);
  const isFinished = state.index + 1 === numQuestions;

  useEffect(function fetchData() {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  // console.log(status, questions);
  return (
    <div className="app">
      <Header />
      <MainBody>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Question question={questions[index]}>
              <Progress
                index={index}
                numQuestions={numQuestions}
                points={points}
                maxPoints={maxPoints}
                answer={answer}
              />
              <Options question={questions[index]} dispatch={dispatch} answer={answer} key={questions[index].id} />
            </Question>
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={questions.length * SECS_PER_QUESTION} />
              <NextButton dispatch={dispatch} answer={answer} isFinished={isFinished} />
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen points={points} maxPoints={maxPoints} highScore={highScore} dispatch={dispatch} />
        )}
      </MainBody>
    </div>
  );
}

export default App;

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
