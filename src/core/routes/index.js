import HomePage from "../../containers/Home/Home";
import TourPage from "../../containers/Tour/Tour";

const publicRoutes = [
    {path: '/', component: HomePage},
    {path: '/tour', component: TourPage},

]



const privateRoutes = {

} 

export {publicRoutes, privateRoutes} 