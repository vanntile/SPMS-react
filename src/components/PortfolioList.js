import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removePortfolio, toggleCurrency, removeStock, addStock, setStockError } from '../actions'

import Portfolio from './Portfolio'

const PortfolioList = ({ portfolios, removePortfolio, toggleCurrency, addStock, removeStock, setStockError }) => (
    <div className='portfolio-container'>
        {portfolios.map(p => (<Portfolio
            key={p.portfolioId}
            portfolioId={p.portfolioId}
            currency={p.currency}
            stockError={p.stockError}
            stocks={p.stocks}
            removePortfolio={removePortfolio}
            toggleCurrency={toggleCurrency}
            addStock={addStock}
            removeStock={removeStock}
            setStockError={setStockError}
        />))}
    </div>
)

PortfolioList.propTypes = {
    portfolios: PropTypes.array.isRequired,
    removePortfolio: PropTypes.func.isRequired,
    toggleCurrency: PropTypes.func.isRequired,
    addStock: PropTypes.func.isRequired,
    removeStock: PropTypes.func.isRequired,
    setStockError: PropTypes.func.isRequired,
}

const getPortfolioList = (error, portfolios) => portfolios

const mapStateToProps = state => ({
    portfolios: getPortfolioList(state.portfolioErr, state.portfolios)
})

const mapDispatchToProps = dispatch => ({
    removePortfolio: portfolioId => dispatch(removePortfolio(portfolioId)),
    toggleCurrency: portfolioId => dispatch(toggleCurrency(portfolioId)),
    addStock: (portfolioId, name, quantity, purchase, value) => dispatch(addStock(portfolioId, name, quantity, purchase, value)),
    removeStock: (portfolioId, name) => dispatch(removeStock(portfolioId, name)),
    setStockError: (portfolioId, error) => dispatch(setStockError(portfolioId, error))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PortfolioList)
