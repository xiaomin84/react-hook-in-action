import useAsync from "./useAsync";
import { useCallback } from "react";

interface User {
  id: number;
  first_name: string;
}

export default function UserList() {
  // 通过 useAsync 这个函数，只需要提供异步逻辑的实现
  const { execute: fetchUsers, data: users, loading, error } = useAsync<User[]>(useCallback(
    async () => {
      const res = await fetch("https://reqres.in/api/users/");
      if (!res.ok) {
        throw new Error("网络请求失败");
      }
      const json: { data: User[] } = await res.json() as { data: User[] };
      return json.data;
    },
    []
  ));

  return (
    <div className="user-list">
      <h1>使用异步示例</h1>

      <button onClick={() => { void fetchUsers(); }} disabled={loading}>
        {loading ? "加载中..." : "显示用户"}
      </button>
      {error && <div style={{ color: "red" }}>失败: {String(error)}</div>}
      <br />
      <ul>
        {users &&
          users.length > 0 &&
          users.map((user: User) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </div>
  );
}
