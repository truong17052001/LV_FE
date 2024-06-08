import HomePage from "../../containers/Home/Home";
import TourPage from "../../containers/Tour/Tour";
import ProfilePage from "../../containers/Profile/Profile";
import LoginPage from "../../containers/Login/Login";
import DetailPage from "../../containers/Detail/Detail";
import BookingPage from "../../containers/Booking/Booking";
const publicRoutes = [
    {path: '/', component: HomePage},
    {path: '/tour', component: TourPage},
    {path: '/info', component: ProfilePage},
    {path: '/login', component: LoginPage},
    {path: '/detail', component: DetailPage},
    {path: '/booking', component: BookingPage},

]



const privateRoutes = {

} 

export {publicRoutes, privateRoutes} 