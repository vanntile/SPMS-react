export const addPortfolio = portfolioId => ({
    type: ActionTypes.addPortfolio,
    portfolioId
})

export const removePortfolio = portfolioId => ({
    type: ActionTypes.removePortfolio,
    portfolioId
})

export const setPortfolioError = error => ({
    type: ActionTypes.portfolioError,
    error
})

export const toggleCurrency = portfolioId => ({
    type: ActionTypes.toggleCurrency,
    portfolioId
})

export const addStock = (portfolioId, name, quantity, purchase, value) => ({
    type: ActionTypes.addStock,
    portfolioId,
    name,
    quantity,
    purchase,
    value
})

export const removeStock = (portfolioId, name) => ({
    type: ActionTypes.removeStock,
    portfolioId,
    name
})

export const setStockError = (portfolioId, error) => ({
    type: ActionTypes.stockError,
    portfolioId,
    error
})

export const ActionTypes = {
    addPortfolio: 'ADD_PORTFOLIO',
    removePortfolio: 'REMOVE_PORTFOLIO',
    portfolioError: 'PORTFOLIO_ERR',
    toggleCurrency: 'TOGGLE_CURRENCY',
    addStock: 'ADD_STOCK',
    removeStock: 'REMOVE_STOCK',
    stockError: 'STOCK_ERR'
}
