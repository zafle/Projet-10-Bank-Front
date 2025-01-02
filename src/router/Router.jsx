import { BrowserRouter, Route, Routes } from 'react-router'
import Home from '../views/home/Home'
import Login from '../views/login/Login'
import Profile from '../views/profile/Profile'
import MainLayout from '../layout/mainlayout/MainLayout'

function Router() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default Router
