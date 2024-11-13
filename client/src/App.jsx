import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CreateIncident from './pages/CreateIncident'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-incident" element={<CreateIncident />} />
      </Routes>
    </Router>
  )
}

export default App
