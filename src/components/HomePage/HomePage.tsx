import React from 'react';
import TransferCardContainer from '../TransferCardContainer/TransferCardContainer';
import Header from '../Header/Header';
const HomePage = () => {
    return <div data-test-id='home-page-component-id'>
        <Header data-test-id='header-element-id' />
        <TransferCardContainer data-test-id='transfer-card-container-element-id' />
    </div>

}
export default HomePage;