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

import { BrowserRouter, Routes, Route } from "react-router-dom"

import DetailTicket from './components/Home/User/DetailTicket';
import FormFilter from './components/Home/User/FormFilter';
import HistoryTransaction from './components/Home/User/HistoryTransaction';
import ContentIndex from './pages/ContentIndex';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Protected>
            <LandingPage />
          </Protected>
        }>
          <Route index element={<ContentIndex />} />
          <Route path="admin/user" element={<ContainerDataUser />} />
          <Route path="admin/user/:id" element={<EditDataUser />} />
          <Route path="admin/user/create" element={<CreateDataUser />} />
          <Route path="admin/ticket" element={<ContainerDataTicket />} />
          <Route path="admin/ticket/:id" element={<EditDataTicket />} />
          <Route path="admin/ticket/create" element={<CreateDataTicket />} />
          <Route path="admin/transaction" element={<ContainerDataTransc />} />
          {/* routes user */}
          <Route path="ticket" element={<FormFilter />} />
          <Route path="ticket/:id" element={<DetailTicket />} />
          <Route path="transaction" element={<HistoryTransaction />} />
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
