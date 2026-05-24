import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { Alert, Button, Card, Input, PageHeader } from "../ui";

type LoginResponse = {
  success: boolean;
  user: { id: number; name: string; email: string };
};

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiFetch<LoginResponse>("auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex max-w-md flex-col">
      <PageHeader title="Login" subtitle="Welcome back" />
      <Card>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3"
        >
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Alert message={error} />}
          <Button
            type="submit"
            label={loading ? "Please wait..." : "Log in"}
            disabled={loading}
          />
        </form>
      </Card>
    </section>
  );
};

export { Auth };
