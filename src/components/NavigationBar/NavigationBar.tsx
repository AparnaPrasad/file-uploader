import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import palette from '../../utilities/palette';
import constants from '../../utilities/constants';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    background: ${palette.white};
    color: ${palette.fontColor};
    border: 1px solid ${ palette.borderColor };
    font-weight: 500;
    font-size: '0.875em';
    text-transform: capitalize;
    &:hover {
        background-color: ${palette.white};
        color: ${palette.fontColor};
    }
`

const NavigationBar = () => {
    const { navBarItems } = constants;
    return <ButtonGroup data-test-id='navigation-bar-component-id'>
        {navBarItems.map((navBarItem, index) => (
            <StyledButton key={index} variant='outline-secondary'>{navBarItem}</StyledButton>
        ))}
    </ButtonGroup>
}
export default NavigationBar;