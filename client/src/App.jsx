import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CustomNav } from "./components/custom_nav.jsx";
import { Signup } from "./pages/signup.jsx";
import { Home } from "./pages/home.jsx";
import { Catalog } from "./pages/catalog.jsx";
import { Login } from "./pages/login.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <CustomNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Signup />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
