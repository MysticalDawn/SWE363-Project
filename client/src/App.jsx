import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CustomNav } from "./components/custom_nav.jsx";
import {Auth} from './pages/auth.jsx';
function App() {
  return (
    <div className="App">
      <Router>
        <CustomNav />
        <Routes>
          <Route path="/"/>
          <Route path="/auth" element = {<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
