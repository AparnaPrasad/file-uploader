import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../store/createStore';
import HomePage from '../HomePage/HomePage';
import { Container } from 'react-bootstrap';

const styles = {
    container: {
        padding: '0 15px',
        height: '100%'
    },
}
const App = () => {
    const store = configureStore();
    return (<Provider data-test-id='app-component-id' store={store}>
        <Container fluid style={styles.container}>
            <HomePage />
        </Container>
    </Provider>
    );
}

export default App;

/*
 set up tests --done
 **file transfer remaining time --done
 * clean up - ts strict
 * 
 transfer card container
 bootstrap disabled style
 react-intl for plural
 test loader, and few more tests
 change scroll bar
 */