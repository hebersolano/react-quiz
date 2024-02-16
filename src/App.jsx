import Header from "./Components/Header.jsx";
import MainBody from "./Components/MainBody.jsx";
import Loader from "./Components/Loader.jsx";
import Error from "./Components/Error.jsx";
import StartScreen from "./Components/StartScreen.jsx";
import Question from "./Components/Question.jsx";
import NextButton from "./Components/NextButton.jsx";
import Options from "./Components/Options";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen.jsx";
import Timer from "./Components/Timer.jsx";
import { useQuizState } from "./contexts/quizContext.jsx";

function App() {
  const { status } = useQuizState();

  // console.log(status, questions);
  return (
    <div className="app">
      <Header />
      <MainBody>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Question>
              <Progress />
              <Options />
            </Question>
            <footer>
              <Timer />
              <NextButton />
            </footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </MainBody>
    </div>
  );
}

export default App;
