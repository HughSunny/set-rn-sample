import React, { Component } from 'react'

import dva from './utils/dva';
import Router, { routerMiddleware, routerReducer } from './DvaRouter'
import appModel from './models/app'
const app = dva({
    initialState: {},
    models:[appModel],
    extraReducers: { router: routerReducer },
    onAction: [routerMiddleware],
    onError(e) {
        console.log('onError', e)
    }
})

const App = app.start(<Router />)

export default App