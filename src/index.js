import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

import { Application } from 'react-rainbow-components'
import AddPortfolio from './components/AddPortfolio'
import PortfolioList from './components/PortfolioList'
import RefreshStocks from './components/RefreshStocks'

// getting the last state, if existing, as an initial store for redux
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}
const store = createStore(rootReducer, persistedState)

// on each change in the store, save the store to the localStorage
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

// Render the default application
// - The Provider assigns our created store as the state management system
// - The application is the default styled component for a react-rainbow app
// - The three upmost parent component are RefreshStock, AddPortfolio and PortfolioList
render(
    <Provider store={store}>
        <Application>
            <div className='rainbow-flex rainbow-justify_center rainbow-p-top_large'>
                <h1 className='rainbow-font-size-heading_x-large title'>SPSM App</h1>
                <RefreshStocks />
            </div>
            <AddPortfolio />
            <PortfolioList />
        </Application>
    </Provider >,
    document.getElementById('root')
)
