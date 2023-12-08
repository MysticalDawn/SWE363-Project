import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/signup.jsx";
import { Home } from "./pages/home.jsx";
import { Catalog } from "./pages/catalog.jsx";
import { Login } from "./pages/login.jsx";
import { ContactUs } from "./pages/contact_us.jsx";
import { Profile } from "./pages/profile.jsx";
import { CompanyInfo } from "./pages/company_info.jsx";
import { Footer } from "./components/footer.jsx";
import { ConfirmationPage } from "./components/confirmation.jsx";
import { useCookies } from "react-cookie";
function App() {
  const [cookies] = useCookies(["token"]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Signup />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/company/:company" element={<CompanyInfo />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/confirm" element={<ConfirmationPage />} />
          {cookies.token ? (
            <Route path="/profile" element={<Profile />} />
          ) : null}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
