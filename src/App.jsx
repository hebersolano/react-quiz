import { useEffect, useReducer, useState } from "react";

import DateCounter from "./Components/DateCounter.jsx";
import Header from "./Components/Header.jsx";
import MainBody from "./Components/MainBody.jsx";
import Loader from "./Components/Loader.jsx";
import Error from "./Components/Error.jsx";
import StartScreen from "./Components/StartScreen.jsx";
import Question from "./Components/Question.jsx";
import NextButton from "./Components/NextButton.jsx";

const initState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
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
    default:
      return new Error("Action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { questions, status, index, answer } = state;
  const numQuestions = questions.length;

  useEffect(function fetchData() {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  console.log(status, questions);
  console.log(state);

  return (
    <div className="app">
      <Header />
      <MainBody>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </MainBody>
    </div>
  );
}

export default App;
