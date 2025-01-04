import { useDispatch, useSelector } from 'react-redux'
import { getAuthState, getUserState } from '../../app/selectors'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { accounts } from '../../data/mock/mockAccounts'
import Account from '../../components/account/Account'
import './Profile.css'
import { getUserProfile, userSlice } from '../../features/userSlice'
import Loader from '../../components/loader/Loader'
import Error from '../../components/Error/Error'

function Profile() {
  const { success, userToken } = useSelector(getAuthState)
  const { firstName, lastName, loading, error } = useSelector(getUserState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!success) {
      navigate('/login', { replace: true })
    } else {
      dispatch(userSlice.actions.setLoading(true))
      dispatch(getUserProfile(userToken))
    }
  }, [success, navigate, userToken, dispatch])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error />
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstName} {lastName}
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <Account
          key={`${index}-userAccount`}
          type={account.type}
          id={account.id}
          amount={account.amount}
          balance={account.balance}
        />
      ))}
    </main>
  )
}
export default Profile
