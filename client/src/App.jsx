import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateIncident from "./pages/CreateIncident";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-incident" element={<CreateIncident />} />
      </Routes>
    </Router>
  );
}

export default App;
