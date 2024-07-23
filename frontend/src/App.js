import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRoute from './Routes/UserRoute';
import AdminRoute from './Routes/AdminRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/*' element={<UserRoute />} />
          <Route path='/admin' element={<AdminRoute />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
