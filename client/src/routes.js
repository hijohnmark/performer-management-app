import App from "./App";
import LandingPage from "./components/LandingPage";
import EventForm from "./components/EventForm";
import PerformerForm from "./components/PerformerForm";
import VenueForm from "./components/VenueForm";
import About from "./components/About";

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
                path: '/about',
                element: <About />
            }
        ]
    }
]

export default routes