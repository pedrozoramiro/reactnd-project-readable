import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import dataSaga from '../commons/saga/sagas'
import rootReducer from '../commons/ReducerRegister'

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
   
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(sagaMiddleware)
        )
    );
    sagaMiddleware.run(dataSaga);
    return store;
}

