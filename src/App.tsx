// #region Imports

// Internal modules and components
import { useAppRoutes } from './app-setup/app-routing';
import { RouterProvider } from 'react-router-dom';

// Styles
import './App.css'
// #endregion Imports

function App() {
	//#region Initializations
    const router = useAppRoutes();
    //#endregion Initializations

    // #region Render
    return (
        <>
		    <RouterProvider router={router} />
        </>
    )
    // #endregion Render
}

export default App
