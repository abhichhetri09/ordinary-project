import React, { useState } from "react";
import { apiFetch } from "../../utils/api";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
};
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    try {
      await apiFetch<User>("user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      navigate("/login");
    } catch {
      setError("Could not create user");
    }
  }
  return (
    <div>
      <h1>Create account</h1>
      <div
        style={{
          padding: "20px",
          gap: "20px",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            placeholder="Passoword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">sign up</button>
        </form>
      </div>
    </div>
  );
};

export { SignUp };
