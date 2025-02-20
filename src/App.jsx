import { RouterProvider, createBrowserRouter, Navigate, useLocation, useParams } from 'react-router-dom'
import { AppProvider, AppContext } from './store/AppContext'
import { useContext } from 'react'
import Root from './pages/Root'
import Home from './pages/Home'
import CategoryClips from './pages/CategoryClips'
import Clip from './pages/Clip'
import ErrorPage from './pages/ErrorPage'
import './App.css'

const EnsureVersionInURL = ({ children }) => {
	const { version } = useContext(AppContext)
	const location = useLocation()
	const params = useParams()

	const hasVersion = params.version

	if (!hasVersion) {
		return (
			<Navigate
				to={`/${version}${location.pathname}`}
				replace
			/>
		)
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
])

const App = () => {
	return (
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	)
}

export default App
