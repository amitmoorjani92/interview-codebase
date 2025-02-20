import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Card, Title, Alert } from "@mantine/core";
import useAuthStore from "../../store/app.store";
// import useAppStore from "../../store/app.store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const login = useAuthStore((state:any) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e:any) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard"); // Redirect after successful login
    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <div>
        <Button mt="md" onClick={() => navigate("/")}>Home</Button>
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}>
            <Title order={3} align="center">Login</Title>
            {error && <Alert color="red" my="sm">{error}</Alert>}
            <form onSubmit={handleLogin}>
                <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <TextInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button fullWidth mt="md" type="submit">Login</Button>
            </form>
        </Card>
    </div>
  );
};

export default Login;
