import { useQuizState } from "../contexts/quizContext";

function Options() {
  const { question, dispatch, answer } = useQuizState();
  const isAnswer = answer !== null;
  const options = question.options;

  return (
    <div className="options">
      {options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${isAnswer && answer === index ? "answer" : ""} ${
              isAnswer ? (question.correctOption === index ? "correct" : "wrong") : ""
            }`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={isAnswer}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
