function NextButton({ dispatch, asnwer, isFinished }) {
  if (asnwer === null) return null;
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: isFinished ? "finished" : "nextQuestion" })}>
      {isFinished ? "Results" : "Next"}
    </button>
  );
}

export default NextButton;
