import { useState } from "react";
import { Table, Loader, Card, Title, Pagination, Button, Center } from "@mantine/core";
import useStarWars from "../../hooks/useStarWars";
import { useNavigate } from "react-router-dom";

const StarWarsList = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const { data, isLoading, isError } = useStarWars(activePage);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }
  if (isError) return <p>Error loading Star Wars characters.</p>;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2} align="center">Star Wars Characters</Title>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Birth Year</th>
          </tr>
        </thead>
        <tbody>
          {data?.results.map((character: any, index: number) => (
            <tr key={index}>
              <td>{character.name}</td>
              <td>{character.height} cm</td>
              <td>{character.mass} kg</td>
              <td>{character.birth_year}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <Pagination
        total={Math.ceil(data.count / 10)} // SWAPI returns 10 results per page
        value={activePage}
        onChange={(page) => setActivePage(page)}
        mt="md"
        position="center"
      />
      <Button mt="md" onClick={() => navigate("/dashboard")}>Back</Button>
    </Card>
  );
};

export default StarWarsList;
