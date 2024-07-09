import HomePage from "../../containers/Home/Home";
import TourPage from "../../containers/Tour/Tour";
import ProfilePage from "../../containers/Profile/Profile";
import LoginPage from "../../containers/Login/Login";
import RegisterPage from "../../containers/Login/Register";
import DetailPage from "../../containers/Detail/Detail";
import BookingPage from "../../containers/Booking/Booking";
import PaymentPage from "../../containers/Booking/Payment";
import DashBoardPage from "../../containers/Admin/Dashboard/Dashboard";
import AdminTour from "../../containers/Admin/Tour/Tour";
import AdminBooking from "../../containers/Admin/Booking/Booking";
import AdminDetailTour from "../../containers/Admin/Tour/DetailTour";
import AdminGuider from "../../containers/Admin/Guider/Guider";
import AdminUser from "../../containers/Admin/User/User";
import AdminHotel from "../../containers/Admin/Hotel/Hotel";
import AdminPlace from "../../containers/Admin/Place/Place";
import AdminVehicle from "../../containers/Admin/Vehicle/Vehicle";
import AdminDateGo from "../../containers/Admin/DateGo/DateGo";
const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/tour", component: TourPage },
  { path: "/info", component: ProfilePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/detail/:id", component: DetailPage },
  { path: "/booking/:id", component: BookingPage },
  { path: "/payment/:id", component: PaymentPage },
];

const privateRoutes = [
  { path: "/dashboard", component: DashBoardPage },
  { path: "/admin/tour", component: AdminTour },
  { path: "/admin/booking", component: AdminBooking },
  { path: "/admin/detail_tour/:id", component: AdminDetailTour },
  { path: "/admin/guider", component: AdminGuider },
  { path: "/admin/date", component: AdminDateGo },
  { path: "/admin/user", component: AdminUser },
  { path: "/admin/place", component: AdminPlace },
  { path: "/admin/hotel", component: AdminHotel },
  { path: "/admin/vehicle", component: AdminVehicle },
  { path: "/admin/activity", component: AdminDateGo },
  { path: "/admin/discount", component: AdminDateGo },
  { path: "/admin/news", component: AdminDateGo },
];

export { publicRoutes, privateRoutes };
