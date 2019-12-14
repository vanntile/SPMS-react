import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateStocks } from '../actions'
import { fetchLatestQuotes } from '../data'

import { Button } from 'react-rainbow-components'

// RefreshStock component receives a single string of symbols from all
// the portfolios and updates the state by passing the response to an action.
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

// Development mode type properties that are required
RefreshStock.propTypes = {
    symbols: PropTypes.string.isRequired,
    updateStocks: PropTypes.func.isRequired,
}

// Helper function to get a single instance of each symbol in all portfolios.
// It reduces stock lists map them to symbol names, filters out duplicates and concatenates to a string
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