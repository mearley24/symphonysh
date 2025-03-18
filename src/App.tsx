
import { Routes, Route } from "react-router-dom";
import Scheduling from "./pages/scheduling";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { ConfirmationPage } from "./pages/scheduling/components/ConfirmationPage";

function App() {
  console.log("App rendering, routes being set up");
  
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<NotFound />} />
        <Route path="/scheduling" element={
          <>
            {console.log("Scheduling route matched")}
            <Scheduling />
          </>
        } />
        <Route path="/scheduling/confirmation" element={
          <>
            {console.log("Confirmation route matched")}
            <ConfirmationPage />
          </>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
