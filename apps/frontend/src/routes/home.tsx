import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";

type Users = {
  id: number;
  name: string;
  email: string;
  phone: string;
  password?: string;
};

const Home = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      const data = await apiFetch<Users[]>("user");
      setUsers(data);
    }
    loadUsers();
  });
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
