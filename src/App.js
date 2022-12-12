import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import Protected from './components/Protected';
import User from './components/Home/Admin/User';
import Dashboard from './components/Home/Admin/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Protected>
            <Home />
          </Protected>
        }>
          <Route path="admin/home" element={<Dashboard />} />
          <Route path="admin/user" element={<User />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
