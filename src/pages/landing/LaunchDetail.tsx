import { useParams, useNavigate } from "react-router-dom";
import { Card, Title, Text, Loader, Image, Button, Alert, Center } from "@mantine/core";
import useLaunchDetails from "../../hooks/useLaunchDetails";
import useRocketDetails from "../../hooks/useRocketDetails";

const LaunchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: launch, isLoading, isError } = useLaunchDetails(id);
  const { data: rocket, isLoading: rocketLoading } = useRocketDetails(launch?.rocket);

  if (isLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }
  if (isError) return <Alert color="red">Failed to load launch details.</Alert>;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2}>{launch.name}</Title>
      <Text size="sm" color="dimmed">
        Launch Date: {new Date(launch.date_utc).toLocaleString()}
      </Text>

      {launch.links?.patch?.large ? (
        <Image src={launch.links.patch.large} height={200} fit="contain" alt="Mission Patch" my="md" />
      ): null }

      <Text>Success: {launch.success ? "✅ Successful" : "❌ Failed"}</Text>
      <Text>Description: {launch.details || "No details available."}</Text>

      {rocketLoading ? (
        <Loader size="sm" />
      ) : (
        rocket && (
          <Card mt="md" shadow="sm" padding="sm" radius="md" withBorder>
            <Title order={3}>{rocket.name}</Title>
            <Text>First Flight: {rocket.first_flight}</Text>
            <Text>Height: {rocket.height.meters} meters</Text>
            <Text>Mass: {rocket.mass.kg} kg</Text>
            {rocket.flickr_images?.length > 0 && (
              <Image src={rocket.flickr_images[0]} height={150} fit="contain" alt="Rocket Image" my="sm" />
            )}
          </Card>
        )
      )}

      <Button mt="md" onClick={() => navigate(-1)}>Back</Button>
    </Card>
  );
};

export default LaunchDetail;
