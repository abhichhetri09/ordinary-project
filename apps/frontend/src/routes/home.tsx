import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { Alert, Button, PageHeader, Spinner } from "../components/ui";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
};

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);
        const data = await apiFetch<User[]>("user");
        if (!cancelled) setUsers(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load users");
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
  const handleClick = (id: number) => {
    navigate(`/user/${id}/edit`);
  };

  const userItems = users.map((user) => {
    return (
      <li
        key={user.id}
        className="flex flex-row justify-between items-center p-2 rounded border border-border bg-surface "
      >
        <div>
          <span className="font-semibold text-foreground">{user.name}</span>
          <span className="text-muted"> — {user.email}</span>
        </div>
        <div>
          <Button
            label="edit"
            variant="ghost"
            onClick={() => handleClick(user.id)}
          />
        </div>
      </li>
    );
  });

  if (loading) return <Spinner label="Loading users..." />;
  if (error) return <Alert message={error} variant="error" />;

  return (
    <section>
      <PageHeader title="Users" subtitle={`${users.length} total`} />
      {users.length === 0 ? (
        <p className="text-muted">No users yet.</p>
      ) : (
        <ul className="mx-auto flex max-w-lg flex-col gap-2 text-left">
          {userItems}
        </ul>
      )}
    </section>
  );
};

export default Home;
