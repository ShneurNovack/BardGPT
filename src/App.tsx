import "./App.css";
import Conversation from "./Conversation";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/conversation" element={<Conversation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
