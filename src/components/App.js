import React from 'react'
import AddPortfolio from './AddPortfolio'
import VisiblePortfolios from '../containers/VisiblePortfolios'
import { Application } from 'react-rainbow-components'

const App = () => (
    <Application>
        <div className='rainbow-flex rainbow-justify_center rainbow-p-top_large'>
            <h1 className='rainbow-font-size-heading_x-large'>SPSM App</h1>
        </div>
        <div className='add-portfolio-container'>
            <AddPortfolio />
        </div>
        <div className='portfolio-container'>
            <VisiblePortfolios />
        </div>
    </Application>
)

export default App
