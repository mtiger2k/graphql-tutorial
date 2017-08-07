import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';

import { createLogger } from 'redux-logger'
import reduxThunk from 'redux-thunk'

import authReducer from '../reducers/authReducer';

export default function configureStore(initialState, apolloClient, history) {

	// Build the middleware for intercepting and dispatching navigation actions
	const middleware = routerMiddleware(history)

	const middlewares = process.env.NODE_ENV === 'development' ?
	    [applyMiddleware(middleware, reduxThunk, createLogger())] :
	    [applyMiddleware(middleware, reduxThunk)];

    const store = createStore(
        combineReducers({
            auth: authReducer,
            router: routerReducer,
            apollo: apolloClient.reducer(),
            form: formReducer
        }),
        initialState,
        compose(
        	applyMiddleware(apolloClient.middleware()), ...middlewares,
        	// If you are using the devToolsExtension, you can add it here also
    		window.devToolsExtension ? window.devToolsExtension() : f => f,
        )
    )

    return store

}