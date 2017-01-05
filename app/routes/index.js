import App from '../components/App/index.jsx';
import Login from '../components/Login/index.jsx'
import Dashboard from '../components/Dashboard/index.jsx'
import Auth from '../auth'

export default [{
    component: App,
    childRoutes: [{
        path: "/",
        getComponent: (location, callback) => {
            if (Auth.isUserAuthenticated()) {
                callback(null, Dashboard);
            } else {
                callback(null, Login);
            }
        }
    }]
}]