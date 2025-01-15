import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import MainLayout from '../layout/mainlayout/MainLayout'
import Home from '../views/home/Home'
import Login from '../views/login/Login'
import Profile from '../views/profile/Profile'
import Error404 from '../views/error404/Error404'
import EditUserName from '../views/profile/components/editUserName/EditUserName'
import UserName from '../views/profile/components/userName/UserName'
import { useSelector } from 'react-redux'
import { getAuthState } from '../redux/selectors'

function Router() {
  const { success } = useSelector(getAuthState)
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!success ? <Login /> : <Navigate to="/profile" replace />}
          />
          <Route
            path="/profile"
            element={success ? <Profile /> : <Navigate to="/" replace />}
          >
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
