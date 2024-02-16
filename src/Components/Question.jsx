import { useQuizState } from "../contexts/quizContext";

function Question({ children }) {
  const { question } = useQuizState();
  return (
    <div>
      <h4>{question.question}</h4>
      {children}
    </div>
  );
}

export default Question;
