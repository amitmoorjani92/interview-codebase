import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import Login from './pages/landing/Login';
import Dashboard from './pages/landing/Dashboard'; // Placeholder for the resource list page
import ProtectedRoute from './routes/ProtectedRoute';
import Launches from "./pages/landing/Launches";
import LaunchDetail from './pages/landing/LaunchDetail';
import StarlinkList from './pages/landing/StarlinkList';
import StarWarsList from './pages/landing/StarwarsList';


export const routes = [
	{
		path: '/',
		element: <App />,
		children: [
		  { path: '/', element: <Landing /> },
		  { path: '/login', element: <Login /> },
		  {
			element: <ProtectedRoute />, // Wrap protected routes
			children: [
				{ path: '/dashboard', element: <Dashboard /> },
				{ path: '/launches', element: <Launches />},
				{ path: '/launches/:id', element: <LaunchDetail />},
				{ path: '/starlink', element: <StarlinkList /> },
				{ path: '/star-wars', element: <StarWarsList/>}
			],
		  },
		],
	  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
