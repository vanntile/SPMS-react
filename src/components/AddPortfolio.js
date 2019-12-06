import React from 'react'
import { connect } from 'react-redux'
import { addPortfolio } from '../actions'

import {
    Button,
    Input
} from 'react-rainbow-components';

const AddPortfolio = ({ dispatch }) => {
    let value = '';

    return (
        <div className='add-portfolio rainbow-background-color_brand'>
            <Input type='text' onChange={e => (value = e.target.value)}
                className=' add-portfolio_input'
            />
            <Button variant='brand' label='Add Portfolio'
                onClick={(e) => {
                    if (!value.trim()) {
                        return
                    }
                    dispatch(addPortfolio(value))
                    value = ''
                }}
            />
        </div>
    )
}

export default connect()(AddPortfolio)
