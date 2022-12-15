import LandingPage from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import Protected from './components/Protected';
import ContainerDataUser from './components/Home/Admin/ContainerDataUser';
import ContainerDataTicket from './components/Home/Admin/ContainerDataTicket';
import ContainerDataTransc from './components/Home/Admin/ContainerDataTransc';
import EditDataUser from './components/Home/Admin/EditDataUser';
import DashboardContent from './components/Home/Admin/DashboardContent';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Protected>
            <LandingPage />
          </Protected>
        }>
          <Route path="admin/home" element={<DashboardContent />} />
          <Route path="admin/user" element={<ContainerDataUser />} />
          <Route path="admin/ticket" element={<ContainerDataTicket />} />
          <Route path="admin/transaction" element={<ContainerDataTransc />} />
          <Route path="admin/user/:id" element={<EditDataUser />} />
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
