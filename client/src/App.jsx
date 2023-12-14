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
import { ForgotPassword } from "./components/forgot.jsx";
import { PasswordReset } from "./components/reset_password.jsx";
import { ConfirmationPage_2 } from "./components/confirmation_2.jsx";
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
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}
          />
          {cookies.token ? (
            <Route path="/profile" element={<Profile />} />
          ) : null}
          <Route path="/confirm-2" element={<ConfirmationPage_2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
