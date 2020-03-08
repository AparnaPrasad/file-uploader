import React from 'react';
import { Button } from 'react-bootstrap';

interface Props {
    variant?: 'primary' | 'secondary'|'outline-primary',
    onClick: () => void,
    children?: React.ReactNode,
    disabled?: boolean
}

const styles = {
    roundedButtonStyle: {
        borderRadius: '19px'
    }
}

const RoundedButton = ({ variant = 'primary', onClick, children, disabled = false }: Props) => {
    return <Button disabled={disabled}
        style={styles.roundedButtonStyle}
        variant={variant}
        onClick={() => onClick()}>
        {children}
    </Button>
}
export default RoundedButton;