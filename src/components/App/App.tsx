import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../store/createStore';
import HomePage from '../HomePage/HomePage';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
padding: '0 15px';
height: '100%';
`
const App = () => {
    const store = configureStore();
    return (<Provider data-test-id='app-component-id' store={store}>
        <StyledContainer fluid>
            <HomePage />
        </StyledContainer>
    </Provider>
    );
}

export default App;
