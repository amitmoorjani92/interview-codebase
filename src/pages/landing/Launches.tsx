import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Table, Loader, TextInput, Select, Title, Card, Button } from "@mantine/core";
import useLaunches from "../../hooks/useLaunches";

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
  success: boolean;
}

const Launches: React.FC = () => {
  const { data, isLoading, isError } = useLaunches();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get initial filters from URL
  const initialSearch = searchParams.get("search") || "";
  const initialYear = searchParams.get("year") || "";

  const [search, setSearch] = useState<string>(initialSearch);
  const [year, setYear] = useState<string | null>(initialYear);

  // Sync URL when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (year) params.year = year;
    setSearchParams(params);
  }, [search, year, setSearchParams]);

  if (isLoading) return <Loader size="xl" />;
  if (isError) return <p>Error loading launches.</p>;

  const filteredLaunches = data?.filter((launch: Launch) => {
    return (
      launch.name.toLowerCase().includes(search.toLowerCase()) &&
      (year ? new Date(launch.date_utc).getFullYear().toString() === year : true)
    );
  }) || [];

  // Get unique years for filtering
  const years = [...new Set(data?.map((launch: Launch) => new Date(launch.date_utc).getFullYear().toString()))].sort();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2} align="center">SpaceX Launches</Title>

      {/* Search Input */}
      <TextInput
        placeholder="Search by mission name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        my="md"
      />

      {/* Year Filter */}
        <Select
            placeholder="Filter by Year"
            data={years.map((y: any) => ({ value: y.toString(), label: y.toString() }))} // Ensure strings
            value={year ?? null} // Ensure string or null
            onChange={(value: string | null) => setYear(value)} // Explicitly type onChange
            my="md"
            clearable
        />

      {/* Table Display */}
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Mission</th>
            <th>Date</th>
            <th>Rocket</th>
            <th>Success</th>
          </tr>
        </thead>
        <tbody>
          {filteredLaunches.map((launch:any) => (
            <tr key={launch.id} onClick={() => navigate(`/launches/${launch.id}`)} style={{ cursor: "pointer" }}>
              <td>{launch.name}</td>
              <td>{new Date(launch.date_utc).toLocaleDateString()}</td>
              <td>{launch.rocket}</td>
              <td>{launch.success ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button mt="md" onClick={() => navigate("/dashboard")}>Back</Button>
    </Card>
  );
};

export default Launches;
