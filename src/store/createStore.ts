import rootReducer from './';
import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore() {

    const enhancers = [];
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const store = createStore(rootReducer, compose(
        applyMiddleware(thunk),
        ...enhancers
    ));
    return store;
}