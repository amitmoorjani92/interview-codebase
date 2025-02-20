import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/app.store"; 

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = useAppStore((state:any) => state.logout); 

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} color="red" variant="outline">
      Logout
    </Button>
  );
};

export default LogoutButton;
