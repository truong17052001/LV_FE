import HomePage from "../../containers/Home/Home";
import TourPage from "../../containers/Tour/Tour";
import ProfilePage from "../../containers/Profile/Profile";
import LoginPage from "../../containers/Login/Login";
import DetailPage from "../../containers/Detail/Detail";
const publicRoutes = [
    {path: '/', component: HomePage},
    {path: '/tour', component: TourPage},
    {path: '/info', component: ProfilePage},
    {path: '/login', component: LoginPage},
    {path: '/detail', component: DetailPage},

]



const privateRoutes = {

} 

export {publicRoutes, privateRoutes} 