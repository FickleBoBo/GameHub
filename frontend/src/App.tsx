import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppleGamePage from "./pages/apple-game/single-play/AppleGamePage";

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apple-game" element={<AppleGamePage />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
