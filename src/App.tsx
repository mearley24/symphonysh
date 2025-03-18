import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scheduling from "./pages/scheduling"; // Updated import for the new Scheduling structure
import Home from "./pages/Home"; // Example import for another page
import NotFound from "./pages/NotFound"; // Example import for a 404 page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
