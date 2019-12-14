import React from 'react'
import PropTypes from 'prop-types'
import { fetchPurchasePrice } from '../data'

import {
    Button,
    Input,
    DatePicker
} from 'react-rainbow-components'


// Helper function to turn a date object to a string of form YYYYMMDD
const dateToString = date => `${date.getFullYear()}${
    date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    }${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`

// AddStock component receives a callback to add a new stock in the parent
// portfolio and sends error-checked formatted data
export default class AddStock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            quantity: 0,
            date: (d => new Date(d.setDate(d.getDate() - 1)))(new Date())
        }
    }

    // update the current state using the input value
    sync(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // error check the iinput data before sending to parent
    save() {
        let { name, quantity, date } = this.state
        name = name.toUpperCase()
        quantity = parseInt(quantity)

        if (name.length === 0 || quantity === 0 || isNaN(quantity)) {
            // missing field
            this.props.addStock({ name: '', quantity: NaN, purchase: NaN, value: NaN })
        } else if (quantity < 0) {
            // quantity is negative
            this.props.addStock({ name, quantity: NaN, purchase: NaN, value: NaN })
        } else {
            fetchPurchasePrice(name, dateToString(date)).then(({ purchase, value }) => {
                // send the received prices, multiplied by the share quantities
                this.props.addStock({
                    name, quantity, purchase: purchase * quantity, value: value * quantity
                })
            }).catch(_ => {
                // unknown symbol
                this.props.addStock({ name: null, quantity: NaN, purchase: NaN, value: NaN })
            })
        }
    }

    // render a form to add a new stock
    render() {
        return (<div>
            <h2 className='add-stock_header'>Stock Details</h2>
            <Input
                label='Name'
                placeholder='AAPL/FB/TWTR/AMZN/GOOG/INTC/IBM'
                type='text'
                name='name'
                onChange={(e) => this.sync(e)}
                className='rainbow-p-horizontal_medium rainbow-p-vertical_x-small'
            />
            <Input
                label='Quantity'
                placeholder='120'
                type='number'
                name='quantity'
                onChange={(e) => this.sync(e)}
                className='rainbow-p-horizontal_medium rainbow-p-vertical_x-small'
            />
            <DatePicker
                label='Purchase'
                value={this.state.date}
                onChange={value => this.setState({ date: value })}
                className='rainbow-p-horizontal_medium rainbow-p-vertical_x-small'
            />
            <Button
                label='Save'
                variant='success'
                className='rainbow-m-around_medium'
                onClick={() => this.save()}
            />
        </div >)
    }
}

// Development mode type properties that are required
AddStock.propTypes = {
    addStock: PropTypes.func.isRequired,
}