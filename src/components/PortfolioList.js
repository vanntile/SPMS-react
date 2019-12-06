import React from 'react';
import Portfolio from './Portfolio'

const PortfolioList = ({ portfolios, removePortfolio, toggleCurrency, addStock, removeStock, setStockError }) => (
    portfolios.map(p => (<Portfolio
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
    />))
);

export default PortfolioList
