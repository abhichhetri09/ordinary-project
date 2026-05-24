import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { Alert, PageHeader, Spinner } from "../components/ui";

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

  if (loading) return <Spinner label="Loading users..." />;
  if (error) return <Alert message={error} variant="error" />;

  return (
    <section>
      <PageHeader title="Users" subtitle={`${users.length} total`} />
      {users.length === 0 ? (
        <p className="text-muted">No users yet.</p>
      ) : (
        <ul className="mx-auto flex max-w-lg flex-col gap-2 text-left">
          {users.map((user) => (
            <li
              key={user.id}
              className="rounded border border-border bg-surface px-4 py-3"
            >
              <span className="font-semibold text-foreground">{user.name}</span>
              <span className="text-muted"> — {user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Home;
