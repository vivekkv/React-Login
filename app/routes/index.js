import App from '../components/App/index.jsx';
import Login from '../components/Login'

export default [{
    component: App,
    childRoutes: [{
        path: "/",
        getComponent: (location, callback) => {
            if (Auth.isUserAuthenticated()) {
                callback(null, DashboardPage);
            } else {
                callback(null, Login);
            }
        }
    }]
}]