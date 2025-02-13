import { useState } from "react";

interface User {
  id: number;
  first_name: string;
}

interface ApiResponse {
  data: User[];
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://reqres.in/api/users/");
      const json = (await res.json()) as ApiResponse;
      setUsers(json.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    }
    setLoading(false);
  };

  const handleClick = () => {
    void fetchUsers();
  };

  return (
    <div className="user-list">
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Show Users"}
      </button>
      {error && <div style={{ color: "red" }}>Failed: {error.message}</div>}
      <br />
      <ul>
        {users.length > 0 &&
          users.map((user) => (
            <li key={user.id}>{user.first_name}</li>
          ))}
      </ul>
    </div>
  );
} 