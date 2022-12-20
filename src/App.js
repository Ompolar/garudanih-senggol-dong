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
import EditDataTicket from './components/Home/Admin/EditDataTicket';
import CreateDataUser from './components/Home/Admin/CreateDataUser';
import CreateDataTicket from './components/Home/Admin/CreateDataTicket';
import DashboardContent from './components/Home/Admin/DashboardContent';

import { BrowserRouter, Routes, Route } from "react-router-dom"

import FetchingTicket from './components/Home/User/FetchingTicket';
import DetailTicket from './components/Home/User/DetailTicket';
import FormTransaction from './components/Home/User/FormTransaction';

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
          <Route path="admin/user/:id" element={<EditDataUser />} />
          <Route path="admin/user/create" element={<CreateDataUser />} />
          <Route path="admin/ticket" element={<ContainerDataTicket />} />
          <Route path="admin/ticket/:id" element={<EditDataTicket />} />
          <Route path="admin/ticket/create" element={<CreateDataTicket />} />
          <Route path="admin/transaction" element={<ContainerDataTransc />} />
          {/* routes user */}
          <Route index element={<FetchingTicket />} />
          <Route path="ticket/:id" element={<DetailTicket />} />
          <Route path="transaction/:ticketId" element={<FormTransaction />} />
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
