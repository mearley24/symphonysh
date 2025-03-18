
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scheduling from "./pages/scheduling";
import NotFound from "./pages/NotFound";

function App() {
  console.log("App rendering, routes being set up");
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotFound />} />
        <Route path="/scheduling" element={
          <>
            {console.log("Scheduling route matched")}
            <Scheduling />
          </>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
