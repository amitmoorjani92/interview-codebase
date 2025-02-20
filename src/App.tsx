import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Group, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import './App.scss';
import LogoutButton from './components/Logout';

export default function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
			<Container>
				{/* Show Logout button only if user is not on login or landing page */}
				{pathname !== "/login" && pathname !== "/" && (
				<Group position="right" my="md">
					<LogoutButton />
				</Group>
				)}
				<Outlet />
			</Container>
		</MantineProvider>
	);
}