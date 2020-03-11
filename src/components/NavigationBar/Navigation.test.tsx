import React from 'react';
import { findByAttribute } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import NavigationBar from './NavigationBar';
import constants from '../../utilities/constants';

const renderComponent = () => {
    
    const wrapper = shallow(<NavigationBar />);
    return wrapper;
}

describe('test NavigationBar component', () => {

    it('should render the component without errors', () => {
        
        const wrapper = renderComponent();
        const navBarComponent = findByAttribute(wrapper,
            'navigation-bar-component-id');
        expect(navBarComponent.length).toBe(1)
    })

    it('should render navigation buttons', () => {
        const { navBarItems } = constants;
        const wrapper = renderComponent();
        const navBarComponent = findByAttribute(wrapper, 'navigation-bar-component-id');
        expect(navBarComponent.children().length).toBe(navBarItems.length)
    })

})