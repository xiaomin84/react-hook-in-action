import { useState, useCallback } from "react";

function useCounter(step: number = 10) {
  // 定义 count 这个 state 用于保存当前数值
  const [count, setCount] = useState(0);
  // 实现加 1 的操作
  const increment = useCallback(() => setCount(prevCount => prevCount + step), [step]);
  // 实现减 1 的操作
  const decrement = useCallback(() => setCount(prevCount => prevCount - step), [step]);
  // 重置计数器
  const reset = useCallback(() => setCount(0), []);

  // 将业务逻辑的操作 export 出去供调用者使用
  return { count, increment, decrement, reset };
}

export default function Counter() {
  // 调用自定义 Hook
  const { count, increment, decrement, reset } = useCounter();

  // 渲染 UI
  return (
    <div>
      <h1>Use Counter</h1>
      <button onClick={decrement}> - </button>
      <span
        style={{ display: "inline-block", width: "40px", textAlign: "center" }}
      >
        {count}
      </span>
      <button onClick={increment}> + </button>
      <button onClick={reset}> reset </button>
    </div>
  );
}
