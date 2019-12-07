import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPortfolio, setPortfolioError } from '../actions'

import {
    Button,
    Input,
    Notification
} from 'react-rainbow-components'

class AddPortfolio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    save(_) {
        if (!this.state.value.trim()) {
            return
        }

        if (this.props.portfolios.includes(this.state.value)) {
            this.props.setPortfolioError(1)
        } else {
            this.props.addPortfolio(this.state.value)
            this.setState({ value: '' })
            this.props.setPortfolioError(0)
        }
    }

    render() {
        return (
            <div className='add-portfolio-container'>
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
                {this.props.portfolioError === 0 ? '' :
                    <Notification
                        title='Cannot create portfolio with the same name'
                        icon='error'
                        className='rainbow-m-around_medium'
                        onRequestClose={() => this.props.setPortfolioError(0)}
                    />}
            </div>
        )
    }
}

AddPortfolio.propTypes = {
    portfolioError: PropTypes.number.isRequired,
    portfolios: PropTypes.array.isRequired,
    addPortfolio: PropTypes.func.isRequired,
    setPortfolioError: PropTypes.func.isRequired,
}

const getPortfolioError = (state) => state.portfolioError
const getPortfolioNames = (state) => state.portfolios.map(p => p.portfolioId)

const mapStateToProps = state => ({
    portfolioError: getPortfolioError(state),
    portfolios: getPortfolioNames(state)
})

const mapDispatchToProps = dispatch => ({
    addPortfolio: portfolioId => dispatch(addPortfolio(portfolioId)),
    setPortfolioError: error => dispatch(setPortfolioError(error))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPortfolio)
