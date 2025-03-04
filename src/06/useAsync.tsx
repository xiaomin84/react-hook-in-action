import { useState, useCallback } from "react";

export default function useAsync<T>(asyncFunction: () => Promise<T>) {
  // 设置三个异步逻辑相关的 state
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // 定义一个 callback 用于执行异步逻辑
  const execute = useCallback(async () => {
    // 请求开始时，设置 loading 为 true，清除已有数据和 error 状态
    setLoading(true);
    setData(null);
    setError(null);
    
    try {
      const response = await asyncFunction(); // 确保 asyncFunction 返回 T 类型
      setData(response); // 设置数据
    } catch (err) {
      // 请求失败时，设置 loading 为 false，并设置错误状态
      setError(err instanceof Error ? err : new Error("未知错误"));
    } finally {
      setLoading(false); // 无论成功或失败，最后都要设置 loading 为 false
    }
  }, [asyncFunction]);

  return { execute, loading, data, error }; // 确保返回的 data 类型为 T | null
}
