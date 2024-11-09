import App from "./App";
import PerformerList from "./components/PerformerList";
import Manage from "./components/Manage";

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <PerformerList />
            },
            {
                path: '/manage',
                element: <Manage />
            }
        ]
    }
]

export default routes