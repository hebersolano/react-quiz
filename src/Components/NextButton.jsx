function NextButton({ dispatch, asnwer }) {
  if (asnwer === null) return null;
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
      Next
    </button>
  );
}

export default NextButton;
