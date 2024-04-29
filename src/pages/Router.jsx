import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "./Mian";
import NotFound from './NotFound'
// import Search from "../components/Search";
import SearchResult from "./SearchResult";


export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFound />,
            children: [
                { index: true, element: <Main /> },
                { path: '/:category/:movieId', element: <Main /> },
                { path: '/search', element: <SearchResult /> },
                { path: '/search/:movieId', element: <SearchResult /> },

            ]
        }
    ])
    return <RouterProvider router={router} />
}