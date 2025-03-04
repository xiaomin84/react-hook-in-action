import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { store, incremented, decremented, RootState } from "./counterSlice";

const Counter = () => {
  // 修改 useSelector 以适应多层状态树
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Redux Counter</h1>
      <button onClick={() => dispatch(decremented())}>-</button>
      <button onClick={() => dispatch(decremented(5))}>-5</button>
      <span style={{ width: "50px", display: "inline-block", textAlign: "center" }}>
        {count}
      </span>
      <button onClick={() => dispatch(incremented())}>+</button>
      <button onClick={() => dispatch(incremented(10))}>+10</button>
    </div>
  );
};

const ReduxCounter = () => {
  return (
    <Provider store={store}>
      <Counter />
      <Counter />
    </Provider>
  );
};

export default ReduxCounter;
