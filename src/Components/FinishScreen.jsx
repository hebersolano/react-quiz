function FinishScreen({ points, maxPoints, highScore, dispatch }) {
  const percentage = Math.floor((points / maxPoints) * 100);

  function handleClick() {
    dispatch({ type: "reset" });
  }

  let emoji;
  if (percentage == 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😉";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage == 0) emoji = "🤦‍♂️";

  console.log(emoji);
  return (
    <>
      <p className="result">
        <span>{emoji}</span> Your score <strong>{points}</strong> out of <strong>{maxPoints}</strong> ({percentage}%)
      </p>
      <p className="highscore">Highscore: {highScore} points</p>
      <button className="btn btn-ui" onClick={handleClick}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
