
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scheduling from "./pages/scheduling"; // Updated import for the new Scheduling structure
import NotFound from "./pages/NotFound"; // Example import for a 404 page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotFound />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
