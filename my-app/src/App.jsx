import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Garage from "./pages/Garage";
import Compare from "./pages/Compare";
import Analytics from "./pages/Analytics";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle/:id" element={<Details />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;