import { RouterProvider, createBrowserRouter, Navigate, useLocation, useParams } from 'react-router-dom'
import { AppProvider, AppContext } from './store/AppContext'
import { useContext } from 'react'
import Root from './pages/Root'
import Home from './pages/Home'
import CategoryClips from './pages/CategoryClips'
import Clip from './pages/Clip'
import TestWrapper from './Components/TestWrapper'
import TestSetup from './pages/TestSetup'
import ErrorPage from './pages/ErrorPage'
import './App.css'

const EnsureVersionInURL = ({ children }) => {
	const { version, versions } = useContext(AppContext)

	const params = useParams()

	const hasVersion = params.version && versions.includes(params.version)

	if (!hasVersion) {
		return <Navigate to={`/${version}`} />
	}

	return children
}

const router = createBrowserRouter([
	{
		path: '*',
		element: (
			<EnsureVersionInURL>
				<Root />
			</EnsureVersionInURL>
		),
		errorElement: <ErrorPage />,
		children: [
			{ path: ':version', element: <Home /> },
			{
				path: ':version/clips',
				children: [
					{ index: true, element: <Home /> },
					{ path: ':category', element: <CategoryClips /> },
					{ path: ':category/:id', element: <Clip /> },
				],
			},
		],
	},
	{
		path: ':version/test',
		element: <Root />,
		children: [
			{ index: true, element: <TestSetup /> },
			{ path: ':id', element: <TestWrapper /> },
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
