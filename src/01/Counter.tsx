import React from "react";

function CounterLabel({count}: {count: number}) {
  const color = count > 10 ? 'red' : 'blue';
  return <span style={{color}}>{count}</span>
}
  
class ConstComp extends React.PureComponent {
    render() {
        return "Hello";
    }
}

export default function Counter() {
  const [count, setCount] = React.useState(0);
  return (
      <button onClick={() => setCount((count) => count + 1)}>
        <CounterLabel count = {count} />
        <ConstComp />
      </button>
  );
}