import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

import { Application } from 'react-rainbow-components'
import AddPortfolio from './components/AddPortfolio'
import PortfolioList from './components/PortfolioList'

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
const store = createStore(rootReducer, persistedState)

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

render(
    <Provider store={store}>
        <Application>
            <div className='rainbow-flex rainbow-justify_center rainbow-p-top_large'>
                <h1 className='rainbow-font-size-heading_x-large title'>SPSM App</h1>
            </div>
            <AddPortfolio />
            <PortfolioList />
        </Application>
    </Provider >,
    document.getElementById('root')
)
