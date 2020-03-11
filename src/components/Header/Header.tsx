import React from 'react';
import we_transfer from './we_transfer.png';
import styled from 'styled-components';
import NavigationBar from '../NavigationBar/NavigationBar';

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Header = () => {
    return <StyledHeader data-test-id='header-component-id'>
        <img data-test-id='image-logo-element-id' src={we_transfer} width={70} height={70} alt='we_transfer' />
        <NavigationBar data-test-id='nav-bar-element-id' />
    </StyledHeader>
}
export default Header;