import { useReducer, useState } from "react";

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - 1 };
    case "inc":
      return { ...state, count: state.count + 1 };
    case "set-count":
      return { ...state, count: Number(action.payload) };
    case "set-step":
      return { ...state, step: Number(action.payload) };
    case "reset":
      return { count: 0, step: 1 };
  }
  // if (action.type == "dec") return { ...state, count: state.count - 1 };
  // if (action.type == "inc") return { ...state, count: state.count + 1 };
  // if (action.type == "set-count") return { ...state, count: action.payload };
  // if (action.type == "set-step") return { ...state, step: action.payload };
  // if (action.type == "reset") return { count: 0, step: 1 };
}

const initState = { count: 0, step: 1 };

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  const [state, dispatch] = useReducer(reducer, initState);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    console.log(e.target.value);
    dispatch({ type: "set-count", payload: e.target.value });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "set-step", payload: e.target.value });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input type="range" min="1" max="10" value={state.step} onChange={defineStep} />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input type="number" value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
