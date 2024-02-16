import { useQuizState } from "../contexts/quizContext";

function NextButton() {
  const { dispatch, answer, isFinished } = useQuizState();

  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: isFinished ? "finished" : "nextQuestion" })}
    >
      {isFinished ? "Results" : "Next"}
    </button>
  );
}

export default NextButton;
