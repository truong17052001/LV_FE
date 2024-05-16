import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./core/routes";

function App() {
  return (
    <Router>
      <Routes>
      {
        publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page></Page>}/>
        })
      }
      </Routes>
    </Router>
  );
}

export default App;
