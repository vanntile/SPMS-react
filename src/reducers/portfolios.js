import { ActionTypes as AT } from '../actions'

const copyPort = p => ({ ...p, stocks: p.stocks.map(s => ({ ...s })) });

export const portfolioErr = (state = 0, action) => {
    switch (action.type) {
        case AT.portfolioErr:
            return (1 - state);
        default:
            return state;
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
                currency: 1 - p.currency,
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
                currency: 1 - p.currency,
                stocks: [...p.stocks.filter(s => s.name !== action.name)]
            } : copyPort(p)))
        case AT.stockError:
            return state.map(p => (p.portfolioId === action.portfolioId ? {
                ...copyPort(p),
                stockError: 1 - p.stockError
            } : copyPort(p)))
        default:
            return state
    }
}
