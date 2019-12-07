import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateStocks } from '../actions'
import { fetchLatestQuotes } from '../data'

import { Button } from 'react-rainbow-components'

const RefreshStock = ({ symbols, updateStocks }) => {
    return (
        <Button
            label="Refresh Stocks"
            onClick={() => {
                fetchLatestQuotes(symbols).then(
                    latestQuotes => updateStocks(latestQuotes)
                )
            }}
            variant="border-inverse"
            className="rainbow-m-horizontal_medium"
        />
    )
}

RefreshStock.propTypes = {
    symbols: PropTypes.string.isRequired,
    updateStocks: PropTypes.func.isRequired,
}

const getPortfolioSymbols = (state) => state.portfolios.reduce((acc, p) => acc.concat(p.stocks), [])
    .map(s => s.name).filter((value, index, self) => self.indexOf(value) === index).join(',')

const mapStateToProps = state => ({
    symbols: getPortfolioSymbols(state),
})

const mapDispatchToProps = dispatch => ({
    updateStocks: latestQuotes => dispatch(updateStocks(latestQuotes)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RefreshStock)