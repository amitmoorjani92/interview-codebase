import { useState } from "react";
import { Table, Loader, TextInput, Card, Title, Pagination, Button } from "@mantine/core";
import useStarlink from "../../hooks/useStarlink";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 50; 

const StarlinkList = () => {
  const { data, isLoading, isError } = useStarlink();
  const [search, setSearch] = useState<string>(""); 
  const [activePage, setActivePage] = useState<number>(1);
  const navigate = useNavigate();

  if (isLoading) return <Loader size="xl" />;
  if (isError) return <p>Error loading Starlink data.</p>;

  // Filter satellites by name
  const filteredSatellites = data.filter((satellite:any) =>
    satellite.spaceTrack.OBJECT_NAME.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredSatellites.length / ITEMS_PER_PAGE);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const paginatedSatellites = filteredSatellites.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  console.log("paginatedSatellites ==>24",paginatedSatellites);
  

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2} align="center">Starlink Satellites</Title>

      <TextInput
        placeholder="Search by Satellite Name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        my="md"
      />

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Launch</th>
            <th>Longitude</th>
            <th>Latitude</th>
          </tr>
        </thead>
        <tbody>
          {paginatedSatellites.map((satellite:any) => (
            <tr key={satellite.id}>
              <td>{satellite.spaceTrack.OBJECT_NAME}</td>
              <td>{satellite.launch}</td>
              <td>{satellite.longitude || "N/A"}</td>
              <td>{satellite.latitude || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ✅ Fixed Pagination Issue */}
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          value={activePage} // Use `value` instead of `page` for Mantine v7+
          onChange={(page) => setActivePage(Number(page))} // Ensure `page` is a number
          mt="md"
          position="center"
        />
      )}
      <Button mt="md" onClick={() => navigate("/dashboard")}>Back</Button>
    </Card>
  );
};

export default StarlinkList;
