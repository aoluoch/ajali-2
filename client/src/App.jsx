import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import CreateIncident from "./components/CreateIncident";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyProfile from "./components/MyProfile";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 overflow-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-incident" element={<CreateIncident />} /> {/* Updated path */}
              <Route path="/profile" element={<MyProfile />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
