import React, { Component } from 'react'

import dva from './utils/dva';
import Router, { routerMiddleware, routerReducer } from './DvaRouter'
import appModel from './models/app'
import loginModel from './models/login'
const app = dva({
    initialState: {},
    models:[appModel,loginModel],
    extraReducers: { router: routerReducer },
    onAction: [routerMiddleware],
    onError(e) {
        console.log('onError', e)
    }
})

const App = app.start(<Router />)

export default App
