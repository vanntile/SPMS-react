import { combineReducers } from 'redux'
import { ActionTypes as AT } from '../actions'

const copyPort = p => ({ ...p, stocks: p.stocks.map(s => ({ ...s })) })

export const portfolioError = (state = 0, action) => {
    switch (action.type) {
        case AT.portfolioError:
            return action.error
        default:
            return state
    }
}

export const portfolios = (state = [], action) => {
    switch (action.type) {
        case AT.addPortfolio:
            return [
                ...state,
                {
                    portfolioId: action.portfolioId,
                    currency: 0,
                    stockError: 0,
                    stocks: []
                }
            ]
        case AT.removePortfolio:
            return state.filter(p => p.portfolioId !== action.portfolioId).map(copyPort)
        case AT.toggleCurrency:
            return state.map(p => (p.portfolioId === action.portfolioId ? {
                ...copyPort(p),
                currency: 1 - p.currency,
                stocks: p.stocks.map(s => ({ ...s }))
            } : copyPort(p)))
        case AT.addStock:
            return state.map(p => (p.portfolioId === action.portfolioId ? {
                ...copyPort(p),
                stocks: [...p.stocks, {
                    name: action.name,
                    quantity: action.quantity,
                    purchase: action.purchase,
                    value: action.value
                }]
            } : copyPort(p)))
        case AT.removeStock:
            return state.map(p => (p.portfolioId === action.portfolioId ? {
                ...copyPort(p),
                stocks: [...p.stocks.filter(s => s.name !== action.name)]
            } : copyPort(p)))
        case AT.stockError:
            return state.map(p => (p.portfolioId === action.portfolioId ? {
                ...copyPort(p),
                stockError: action.error
            } : copyPort(p)))
        case AT.updateStocks:
            return state.map(p => ({
                ...copyPort(p),
                stocks: p.stocks.map(s => ({
                    ...s,
                    value: s.quantity * action.latestQuotes[s.name].quote.latestPrice
                }))
            }))
        default:
            return state
    }
}

export default combineReducers({
    portfolioError,
    portfolios
})
