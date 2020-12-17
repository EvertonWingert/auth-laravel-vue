import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import Home from './components/HomeComponent';

export default{
    mode: 'history',
    linkActiveClass: 'font-semibold',
    routes:[
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register

        },
        {
            path: '/home',
            component: Home

        },
        
    ]
}