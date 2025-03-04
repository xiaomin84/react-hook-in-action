import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

// 定义 State 的类型
interface CounterState {
  value: number;
}

// 创建 slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 } as CounterState,
  reducers: {
    incremented: (state, action: PayloadAction<number | undefined>) => {
      const step = action.payload ?? 1; // 默认步长为1
      state.value += step;
    },
    decremented: (state, action: PayloadAction<number | undefined>) => {
      const step = action.payload ?? 1; // 默认步长为1
      state.value -= step;
    },
  },
});

// 导出 actions
export const { incremented, decremented } = counterSlice.actions;

// 创建 store，使用多层结构
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    // 可以添加其他 reducer
  }
});

// 定义 RootState 类型
export type RootState = ReturnType<typeof store.getState>; 