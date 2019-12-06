import { connect } from 'react-redux'
import { removePortfolio, toggleCurrency, removeStock, addStock, setStockError } from '../actions'
import PortfolioList from '../components/PortfolioList'

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
