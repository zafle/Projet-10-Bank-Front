import PropTypes from 'prop-types'
import './Account.css'

function Account({ type, id, amount, balance }) {
  const accountAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">
          Argent Bank {type} ({id})
        </h3>
        <p className="account-amount">{accountAmount}</p>
        <p className="account-amount-description">{balance} Balance</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  )
}

Account.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  balance: PropTypes.string.isRequired,
}

export default Account
