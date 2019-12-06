import React from 'react'
import {
    Button,
    Input
} from 'react-rainbow-components';


export default class AddStock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            quantity: 0,
            purchase: '',
            value: 0
        }
    }

    sync(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    save() {
        let { name, quantity, purchase, value } = this.state;
        quantity = parseInt(quantity);
        value = quantity * 1; // TODO: * value of a share at purchase
        this.props.addStock({ name, quantity, purchase, value });
    }

    render() {
        return (<div>
            <h2 className='add-stock_header'>Stock Details</h2>
            <Input
                label='Name'
                placeholder='AAPL'
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
            <Input
                label='Purchase'
                placeholder='21/04/2014'
                type='text'
                name='purchase'
                onChange={(e) => this.sync(e)}
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
