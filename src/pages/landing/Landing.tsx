import { FC } from 'react';
import {Button, Center, Container, Title} from "@mantine/core";
import { useNavigate } from 'react-router-dom';

const Landing: FC = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<Center style={{ height: "100vh", flexDirection: "column" }}>
				<Title order={4}>Hello World</Title>
				<Button mt="md" size="lg" variant="filled" onClick={() => navigate('/login')}>
					Login
				</Button>
			</Center>
		</Container>
	);
};

export default Landing

