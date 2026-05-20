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
    let cancelled = false;

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);
        const data = await apiFetch<Users[]>("user");
        if (!cancelled) setUsers(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load users",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
