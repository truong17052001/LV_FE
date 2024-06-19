import HomePage from "../../containers/Home/Home";
import TourPage from "../../containers/Tour/Tour";
import ProfilePage from "../../containers/Profile/Profile";
import LoginPage from "../../containers/Login/Login";
import RegisterPage from "../../containers/Login/Register";
import DetailPage from "../../containers/Detail/Detail";
import BookingPage from "../../containers/Booking/Booking";
import DashBoardPage from "../../containers/Admin/Dashboard/Dashboard";
import AdminTour from "../../containers/Admin/Tour/Tour";
const publicRoutes = [
    {path: '/', component: HomePage},
    {path: '/tour', component: TourPage},
    {path: '/info', component: ProfilePage},
    {path: '/login', component: LoginPage},
    {path: '/register', component: RegisterPage},
    {path: '/detail/:id', component: DetailPage},
    {path: '/booking', component: BookingPage},
];



const privateRoutes = [
    {path: '/dashboard', component: DashBoardPage},
    {path: '/admin/tour', component: AdminTour},
]


export {publicRoutes, privateRoutes} 