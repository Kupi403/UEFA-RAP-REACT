import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { AppProvider } from './store/AppContext'
import Root from './pages/Root'
import Home from './pages/Home'
import CategoryClips from './pages/CategoryClips'
import Clip from './pages/Clip'
import ErrorPage from './pages/ErrorPage'
import './App.css'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: 'clips',
				children: [
					{ index: true, element: <Navigate to='/' /> },
					{
						path: ':category',
						element: <CategoryClips />,
					},
					{ path: ':category/:id', element: <Clip /> },
				],
			},
		],
	},
])

const App = () => {
	return (
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	)
}

export default App
