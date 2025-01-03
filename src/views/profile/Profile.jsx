import { useSelector } from 'react-redux'
import { getAuthSuccess } from '../../app/selectors'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { accounts } from '../../data/mock/mockAccounts'
import Account from '../../components/account/Account'
import './Profile.css'

function Profile() {
  const authSuccess = useSelector(getAuthSuccess)
  const navigate = useNavigate()

  useEffect(() => {
    if (!authSuccess) {
      navigate('/login', { replace: true })
    }
  }, [authSuccess, navigate])

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          Tony Jarvis!
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
