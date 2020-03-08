import React from 'react';
import we_transfer from './we_transfer.png';
import styled from 'styled-components';
import { ButtonGroup, Button } from 'react-bootstrap';
import NavigationBar from '../NavigationBar/NavigationBar';

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Header = () => {
    return <StyledHeader>
        <img src={we_transfer} width={50} height={50} />
        <NavigationBar/>
    </StyledHeader>
}
export default Header;