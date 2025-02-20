import { Button, Title, Card } from "@mantine/core";
import useAuthStore from "../../store/app.store";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const logout = useAuthStore((state:any) => state.logout);
  const navigate = useNavigate();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: "auto", margin: "auto", marginTop: 100 }}>
      <Title order={3} align="center">Welcome to SpaceX</Title>
      <Button fullWidth mt="md" onClick={() => navigate('/launches')}>Rocket Launches</Button>
      <Button fullWidth mt="md" onClick={() => navigate('/starlink')}>Starlink</Button>
      <Button fullWidth mt="md" onClick={() => navigate('/star-wars')}>Star Wars List</Button>
    </Card>
  );
};

export default Dashboard;
