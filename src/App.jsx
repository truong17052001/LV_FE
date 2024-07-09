import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./core/routes";
//context
function App() {
  return (
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route key={index} path={route.path} element={<Page></Page>} />
            );
          })}
          {privateRoutes.map((route, index) => {
            const PageS = route.component;
            return (
              <Route key={index} path={route.path} element={<PageS></PageS>} />
            );
          })}
        </Routes>
      </Router>
  );
}

export default App;
