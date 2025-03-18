
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scheduling from "./pages/scheduling"; // Import the correct path
import NotFound from "./pages/NotFound";

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
