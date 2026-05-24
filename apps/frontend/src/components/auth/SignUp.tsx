import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { Alert, Button, Card, Input, PageHeader } from "../ui";

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
};

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await apiFetch<User>("user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      navigate("/login");
    } catch {
      setError("Could not create user. Email may already exist.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex max-w-md flex-col">
      <PageHeader title="Create account" subtitle="Sign up to get started" />
      <Card>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3"
        >
          <Input
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            label={loading ? "Please wait..." : "Sign up"}
            disabled={loading}
          />
        </form>
      </Card>
    </section>
  );
};

export { SignUp };
