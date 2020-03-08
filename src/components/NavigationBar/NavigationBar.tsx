import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import palette from '../../utilities/palette';
import constants from '../../utilities/constants';
const styles = {
    navButton: {
        background: palette.white,
        color: palette.fontColor,
        border: `1px solid ${palette.borderColor}`,
        fontWeight: 500,
        fontSize: '0.875em',
        textTransform: 'capitalize' as 'capitalize'
    },
}

const NavigationBar = () => {
    const { navBarItems } = constants;
    return <ButtonGroup >
        {navBarItems.map((navBarItem, index) => (
            <Button key={index} style={styles.navButton}>{navBarItem}</Button>
            ))}
    </ButtonGroup>
}
export default NavigationBar;