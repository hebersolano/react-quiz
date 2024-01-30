function Options({ question, dispatch, answer }) {
  const isAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => {
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
