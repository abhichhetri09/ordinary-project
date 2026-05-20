import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/users" element={<Users />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
