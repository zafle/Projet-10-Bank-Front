import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { getAuthState, getUserState } from '../../redux/selectors'
import { getUserProfile, userSlice } from '../../redux/features/userSlice'
import { accounts } from '../../data/mock/mockAccounts'
import Account from '../../components/account/Account'
import Loader from '../../components/loader/Loader'
import Error from '../../components/error/Error'
import './Profile.css'
import { logout } from '../../services/logout'

function Profile() {
  const { success, userToken } = useSelector(getAuthState)
  const { loading, error } = useSelector(getUserState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!success) {
      navigate('/', { replace: true })
    } else {
      dispatch(userSlice.actions.setLoading(true))
      // logout user after 10 minutes of inaction
      const logoutTimeout = setTimeout(logout, 600000, dispatch)
      dispatch(getUserProfile(userToken))

      // clean timeout
      return () => clearTimeout(logoutTimeout)
    }
  }, [success, userToken, navigate, dispatch])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <Outlet />
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <Account
          key={`${index}-userAccount`}
          type={account.type}
          number={account.number}
          balance={account.balance}
          balanceType={account.balanceType}
        />
      ))}
    </main>
  )
}
export default Profile
