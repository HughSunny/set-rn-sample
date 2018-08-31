import router from './mRouter'

export const registerModels = app => {
    app.model(router);
}

export const createAction = type => payload => ({ type, payload })

export default {
    router,
}