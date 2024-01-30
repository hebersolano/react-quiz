function StartScreen({ numQuestions, dispatch }) {
  function handleClick() {
    dispatch({ type: "start" });
  }

  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleClick}>
        Let&apos;s Start
      </button>
    </div>
  );
}

export default StartScreen;
