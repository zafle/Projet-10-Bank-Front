import PropTypes from 'prop-types'
import './Account.css'

function Account({ type, number, balance, balanceType }) {
  const accountAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(balance)

  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">
          Argent Bank {type} ({number})
        </h3>
        <p className="account-amount">{accountAmount}</p>
        <p className="account-amount-description">{balanceType} Balance</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  )
}

Account.propTypes = {
  type: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  balanceType: PropTypes.string.isRequired,
}

export default Account
