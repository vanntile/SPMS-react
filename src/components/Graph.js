import React from 'react'
import PropTypes from 'prop-types'
import { fetchChartData } from '../data'

import {
    Modal,
    Chart,
    Dataset,
    DatePicker,
} from 'react-rainbow-components'

// The Graph presentational component gets IEX chart data for the current
// portfolio and displays a modal with a graph with the evolution of each symbol type.
export default class Graph extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // default colors for 
            colorList: [
                '#1de9b6', '#e41749', '#1ee3cf', '#6b48ff', '#0d3f67', '#f5587b', '#ff8a5c',
                '#fff591', '#c50d66', '#7B3B8C', '#42218E', '#83FFE6', '#FF5F5F', '#2C2C2C'
            ],
            labels: [],
            datasets: [],
            start: this.shiftDate(new Date(), -21),
            end: this.shiftDate(new Date(), 0)
        }

        this.queryDatasets()
    }

    // helper function to shift a date with a specific number of days
    shiftDate = (d, dt) => (new Date(d.setDate(d.getDate() + dt)))

    // helper function to filter the response chart data between the selected dates
    filterStocks = stocks => stocks.chart.filter(dateString => {
        const date = (new Date(dateString.date)).setHours(0)

        return date >= this.state.start && date <= this.state.end
    })

    // query IEX for charts and parse the response for datasets and labels
    queryDatasets() {
        const datasets = []
        let labels = []

        fetchChartData(this.props.symbols, this.state.start).then(stocks => {
            let idx = 0

            // the response is a 'dictionary like object with symbols as keys
            for (let symbol in stocks) {
                datasets.push({
                    symbol,
                    values: this.filterStocks(stocks[symbol]).map(d =>
                        d.close * (this.props.currency === 0 ? 0.9 : 1)
                    ),
                    color: this.state.colorList[idx++ % this.state.colorList.length]
                })

                labels = this.filterStocks(stocks[symbol]).map(d => d.date)
            }

            this.setState({ labels })
            this.setState({ datasets })
        })
    }

    // turn dataset data into a list of Dataset styled components
    renderDatasets = () => this.state.datasets.map(({ symbol, values, color }) => (
        <Dataset
            key={symbol} title={symbol} values={values}
            backgroundColor={color} borderColor={color}
        />
    ))

    // Render a modal with a title header, a footer with datetime selectors
    // and a graph with the received data.
    render() {
        return (
            <Modal
                isOpen={true}
                onRequestClose={() => this.props.toggleGraph()}
                title={`Performance of ${this.props.portfolioId}`}
                footer={
                    <div className='rainbow-flex rainbow-justify_spread'>
                        <DatePicker
                            label='Start date'
                            value={this.state.start}
                            onChange={value => {
                                this.setState({ start: value })
                                this.queryDatasets()
                            }}
                            className='rainbow-p-horizontal_medium rainbow-p-vertical_x-small'
                        />
                        <DatePicker
                            label='End date'
                            value={this.state.end}
                            onChange={value => {
                                this.setState({ end: value })
                                this.queryDatasets()
                            }}
                            className='rainbow-p-horizontal_medium rainbow-p-vertical_x-small'
                        />
                    </div>
                }
                size='large'
            >
                <div className='rainbow-align-content_center'>
                    <Chart labels={this.state.labels} type='line'>
                        {this.renderDatasets()}
                    </Chart>
                </div>
            </Modal >
        )
    }
}

// Development mode type properties that are required
Graph.propTypes = {
    portfolioId: PropTypes.string.isRequired,
    symbols: PropTypes.string.isRequired,
    toggleGraph: PropTypes.func.isRequired,
    currency: PropTypes.number.isRequired,
}