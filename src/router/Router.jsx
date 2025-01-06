import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from '../layout/mainlayout/MainLayout'
import Home from '../views/home/Home'
import Login from '../views/login/Login'
import Profile from '../views/profile/Profile'
import Logout from '../views/logout/Logout'
import Error404 from '../views/error404/Error404'
import EditUserName from '../views/profile/components/editUserName/EditUserName'
import UserName from '../views/profile/components/userName/UserName'

function Router() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="edit" element={<EditUserName />} />
            <Route index element={<UserName />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default Router
