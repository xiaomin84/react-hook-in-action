import React, { useState, useMemo, useEffect } from "react";

// 定义用户数据接口
interface User {
  id: number;
  first_name: string;
  // ... 其他字段
}

interface UserResponse {
  data: User[];
}

// 使用 React.memo 包装搜索输入框组件
const SearchInput = React.memo(function SearchInput({ 
  value, 
  onChange 
}: { 
  value: string;
  onChange: (value: string) => void;
}) {
  console.log("SearchInput render"); // 用于调试观察渲染
  return (
    <input
      type="text"
      value={value}
      onChange={(evt) => onChange(evt.target.value)}
    />
  );
});

// 使用 React.memo 包装用户列表组件
const UserList = React.memo(function UserList({ 
  users 
}: { 
  users: User[] 
}) {
  console.log("UserList render"); // 用于调试观察渲染
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.first_name}</li>
      ))}
    </ul>
  );
});

export default function SearchUserList() {
  const [users, setUsers] = useState<UserResponse | null>(null);
  const [searchKey, setSearchKey] = useState("");

  // 使用 useCallback 缓存 onChange 处理函数
  const handleSearchChange = React.useCallback((value: string) => {
    setSearchKey(value);
  }, []);

  useEffect(() => {
    const doFetch = async () => {
      try {
        const res = await fetch("https://reqres.in/api/users/");
        const data = (await res.json()) as UserResponse;
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    void doFetch();
  }, []);

  const usersToShow = useMemo(() => {
    if (!users?.data) return [];
    return users.data.filter((user) => 
      user.first_name.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [users, searchKey]);

  return (
    <div>
      <SearchInput value={searchKey} onChange={handleSearchChange} />
      {usersToShow.length > 0 && <UserList users={usersToShow} />}
    </div>
  );
}
