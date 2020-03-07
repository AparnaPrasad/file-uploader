import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import configureStore from '../../store/createStore';
import HomePage from '../HomePage/HomePage';
const App = () => {
    const store = configureStore();

    return (<Provider store={store}>
        <div className="App">
            <HomePage/>
        </div>
        </Provider>
  );
}

export default App;
