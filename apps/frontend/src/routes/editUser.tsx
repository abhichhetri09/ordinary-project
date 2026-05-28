import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Input, PageHeader } from "../components/ui";
import { apiFetch } from "../utils/api";
import { errorAlert, successAlert, type AlertState } from "../utils/alert";

type User = {
  id: number;
  name?: string;
  email?: string;
  phone?: string | null;
};

type GetUserResponse = {
  success: boolean;
  user: User;
};

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    apiFetch<GetUserResponse>(`user/${id}`)
      .then((data) => {
        setName(data.user.name ?? "");
        setEmail(data.user.email ?? "");
        setPhone(data.user.phone ?? "");
      })
      .catch(() => setAlert(errorAlert("Could not load user")));
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    try {
      const result = await apiFetch<{ success: boolean }>(`user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      if (result.success) {
        setAlert(successAlert("User updated successfully"));
      } else {
        setAlert(errorAlert("Failed to update user"));
      }
    } catch {
      setAlert(errorAlert("Failed to update user"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex max-w-md flex-col">
      <PageHeader title="Edit User" />
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
          {alert && <Alert message={alert.message} variant={alert.variant} />}
          <Button type="submit" label="Save" loading={loading} size="sm" />
        </form>
      </Card>
    </section>
  );
};

export { EditUser };
