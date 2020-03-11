import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import palette from '../../utilities/palette';

export interface Props {
    variant?: 'primary' | 'secondary'|'outline-primary',
    onClick: () => void,
    children?: React.ReactNode,
    disabled?: boolean
}

const StyledButton = styled(Button)`
    
	border-radius: 19px;
    &:disabled {
        background-color: ${palette.lightGrey};
        color: ${palette.fontColor};
        border: none;
    }
`;

const RoundedButton = ({ variant = 'primary', onClick, children, disabled = false }: Props) => {
    return <StyledButton
        data-test-id='rounded-button-component-id'
        disabled={disabled}
        variant={variant}
        onClick={() => onClick()}>
        {children}
    </StyledButton>
}
export default RoundedButton;