import HomePage from "../../containers/Home/Home";
import TourPage from "../../containers/Tour/Tour";
import ProfilePage from "../../containers/Profile/Profile";
import LoginPage from "../../containers/Login/Login";
const publicRoutes = [
    {path: '/', component: HomePage},
    {path: '/tour', component: TourPage},
    {path: '/info', component: ProfilePage},
    {path: '/login', component: LoginPage},


]



const privateRoutes = {

} 

export {publicRoutes, privateRoutes} 