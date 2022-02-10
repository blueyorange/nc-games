import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Reviews from "./components/Reviews";
import UserPage from "./components/UserPage";
import ReviewPage from "./components/ReviewPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Reviews />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/:category" element={<Reviews />} />
          <Route path="/users/:username" element={<UserPage />} />
          <Route path="/review/:review_id" element={<ReviewPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
