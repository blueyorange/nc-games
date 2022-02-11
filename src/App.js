import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Reviews from "./components/Reviews";
import UserPage from "./components/UserPage";
import ReviewPage from "./components/ReviewPage";
import { UserContext } from "./contexts/User";
import LoginStatus from "./components/LoginStatus";

function App() {
  const [user, setUser] = useState({
    username: "jessjelly",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
    name: "Jess Jelly",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="App">
          <LoginStatus />
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
    </UserContext.Provider>
  );
}

export default App;
