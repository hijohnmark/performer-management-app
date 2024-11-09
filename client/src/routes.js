import App from "./App";
import PerformerList from "./components/PerformerList";
import Form from "./components/Form";

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
                element: <Form />
            }
        ]
    }
]

export default routes