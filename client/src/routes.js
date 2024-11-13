import App from "./App";
import LandingPage from "./components/LandingPage";
import Manage from "./components/Manage";
import EventList from "./components/EventList";

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: '/manage',
                element: <Manage />
            },
            {
                path:'/events',
                element: <EventList />
            }
        ]
    }
]

export default routes