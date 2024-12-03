import App from "./App";
import LandingPage from "./components/LandingPage";
import Manage from "./components/Manage";
import EventForm from "./components/EventForm";
import PerformerForm from "./components/PerformerForm";
import VenueForm from "./components/VenueForm";

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
                path: '/performers',
                element: <PerformerForm />
            },
            {
                path: '/events',
                element: <EventForm />
            },
            {
                path: '/venues',
                element: <VenueForm />
            },
            {
                path: '/nearby',
                element: <Manage />
            }
        ]
    }
]

export default routes