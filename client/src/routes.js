import App from "./App";
import PerformerList from "./components/PerformerList";

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <PerformerList />
            }
        ]
    }
]

export default routes