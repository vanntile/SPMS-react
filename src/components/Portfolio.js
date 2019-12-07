import React from 'react'
import PropTypes from 'prop-types'
import '../index.css'

import AddStock from './AddStock'
import {
    TableWithBrowserPagination,
    Column,
    MenuItem,
    Card,
    Button,
    Tabset,
    Tab,
    Chip,
    CheckboxToggle,
    Notification
} from 'react-rainbow-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faEuroSign } from '@fortawesome/free-solid-svg-icons'

const formatNumber = n => parseInt(n * 100) / 100

export default class Portfolio extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.stocks.length === 0 ? { selected: 'add' } : { selected: 'stocks' }
    }

    parseStocks = (stocks) => {
        const exchange = this.props.currency === 0 ? 1 : 1.11
        return stocks.map(s => ({
            ...s,
            value: formatNumber(s.value * exchange),
            purchase: formatNumber(s.purchase * exchange)
        }))
    }

    getPortfolioValue = () => formatNumber(
        this.props.stocks.map(s => s.value).reduce((a, b) => a + b, 0) * (this.props.currency === 0 ? 1 : 1.11)
    )

    parseNewStock = ({ name, quantity, purchase, value }) => {
        if (name === null) {
            this.props.setStockError(this.props.portfolioId, 1)
        } else if (name.length === 0) {
            this.props.setStockError(this.props.portfolioId, 2)
        } else if (isNaN(quantity)) {
            this.props.setStockError(this.props.portfolioId, 3)
        } else if (isNaN(purchase)) {
            this.props.setStockError(this.props.portfolioId, 4)
        } else if (this.props.stocks.find(s => s.name === name) !== undefined) {
            this.props.setStockError(this.props.portfolioId, 5)
        } else {
            this.props.addStock(this.props.portfolioId, name, quantity, purchase, value)
            this.setState({ selected: 'stocks' })
            this.props.setStockError(this.props.portfolioId, 0)
        }
    }

    getTabContent() {
        if (this.state.selected === 'stocks') {
            return (
                <TableWithBrowserPagination pageSize={5} data={this.parseStocks(this.props.stocks)} keyField='name'>
                    <Column header='Stock' field='name' />
                    <Column header='Quantity' field='quantity' />
                    <Column header='Purchase' field='purchase' />
                    <Column header='Value' field='value' />
                    <Column type='action'>
                        <MenuItem
                            label='Delete'
                            onClick={(e, data) => (this.props.removeStock(this.props.portfolioId, data.name))}
                        />
                    </Column>
                </TableWithBrowserPagination>
            )
        } else {
            return (<AddStock addStock={newStock => this.parseNewStock(newStock)} />)
        }
    }

    computeErrorMessage = () => {
        switch (this.props.stockError) {
            case 1:
                return 'Unknown name symbol'
            case 2:
                return 'All fields are required'
            case 3:
                return 'Quantity cannot be negative'
            case 4:
                return 'There is no historical data for weekends or holidays'
            case 5:
                return 'Entry with that name already exists'
            default:
                return ''
        }
    }

    render() {
        return (
            <Card
                title={this.props.portfolioId}
                actions={<span>
                    <Chip className='rainbow-m-horizontal_medium' label={
                        <span>
                            <FontAwesomeIcon
                                icon={this.props.currency === 0 ? faEuroSign : faDollarSign}
                                className='rainbow-color_white rainbow-m-right_xx-small'
                            />{'  '}
                            {this.getPortfolioValue()}
                        </span>
                    } variant='brand' />

                    <Button
                        variant='destructive'
                        label='Delete'
                        onClick={() => this.props.removePortfolio(this.props.portfolioId)}
                    />
                </span>}
                footer={
                    <div className='rainbow-flex rainbow-justify_spread'>
                        <CheckboxToggle
                            label={this.props.currency === 0 ? 'Change to USD' : 'Change to EUR'}
                            value={this.props.currency !== 0}
                            onChange={() => this.props.toggleCurrency(this.props.portfolioId)}
                        />
                        <Button variant='outline-brand' label='Plot performance' />
                    </div>
                }
                className='portfolio'
            >
                <Tabset
                    fullWidth
                    onSelect={(_, selected) => this.setState({ selected })}
                    activeTabName={this.state.selected}
                    className='grey'
                >
                    <Tab name='stocks' label={<span>Stocks</span>} />
                    <Tab name='add' label={<span>Add Stock</span>} />
                </Tabset>
                {this.getTabContent()}
                {this.props.stockError === 0 ? '' :
                    <div className='rainbow-flex rainbow-justify_center'>
                        <Notification
                            title='Cannot save'
                            description={this.computeErrorMessage()}
                            icon='error'
                            className='rainbow-m-bottom_medium'
                            onRequestClose={() => this.props.setStockError(this.props.portfolioId, 0)}
                        />
                    </div>
                }
            </Card >
        )
    }
}

Portfolio.propTypes = {
    portfolioId: PropTypes.string.isRequired,
    currency: PropTypes.number.isRequired,
    stockError: PropTypes.number.isRequired,
    stocks: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            purchase: PropTypes.number.isRequired,
            value: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired,
    removePortfolio: PropTypes.func.isRequired,
    removeStock: PropTypes.func.isRequired
}
