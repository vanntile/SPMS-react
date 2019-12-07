import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPortfolio } from '../actions'

import {
    Button,
    Input
} from 'react-rainbow-components'

class AddPortfolio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    save(e) {
        if (!this.state.value.trim()) {
            return
        }
        this.props.dispatch(addPortfolio(this.state.value))
        this.setState({ value: '' })
    }

    render() {
        return (
            <div className='add-portfolio rainbow-background-color_brand'>
                <Input
                    type='text'
                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                    className='add-portfolio_input'
                />
                <Button
                    variant='brand'
                    label='Add Portfolio'
                    onClick={(e) => this.save(e)}
                />
            </div>
        )
    }
}

AddPortfolio.propTypes = {
    dispatch: PropTypes.func.isRequired,
}

export default connect()(AddPortfolio)
