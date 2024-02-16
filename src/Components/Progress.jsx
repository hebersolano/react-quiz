import { useQuizState } from "../contexts/quizContext";

function Progress() {
  const { index, numQuestions, points, maxPoints, answer } = useQuizState();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        {points} / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
