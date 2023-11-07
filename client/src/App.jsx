import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CustomNav } from "./components/custom_nav.jsx";
import { Auth } from "./pages/auth.jsx";
import { Home } from "./pages/home.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <CustomNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
