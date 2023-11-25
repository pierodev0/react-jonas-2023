import { useState } from "react";
function App(){
  return (
    <div>
      <Counter/>
    </div>
  )
}
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date();
  date.setDate(date.getDate() + count);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div>
      <div>
        <button onClick={() => setStep((step) => step - 1)}>-</button>
        Step: {step}
        <button onClick={() => setStep((step) => step + 1)}>+</button>
      </div>
      <div>
        <button onClick={() => setCount((count) => count - step)}>-</button>
        Count: {count}
        <button onClick={() => setCount((count) => count + step)}>+</button>
      </div>
      <span>
        {count === 0
          ? "Today is "
          : count > 0
          ? `${count} days from today is `
          : `${count} days ago was}`}
      </span>
      <span>{date.toLocaleDateString("en-US", options)}</span>
    </div>
  );
}

export default App;
