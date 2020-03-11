import React from 'react';
import { findByAttribute } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import Header from './Header';



const renderComponent = () => {
    const wrapper = shallow(<Header />);
    return wrapper;
}

describe('test Header component', () => {
    it('should render the component without error', () => {
        const wrapper = renderComponent();
        const headerComponent = findByAttribute(wrapper, 'header-component-id');
        expect(headerComponent.length).toBe(1)
    })

    it('should render image logo', () => {
        const wrapper = renderComponent();
        const imageLogoComponent = findByAttribute(wrapper, 'image-logo-element-id');
        expect(imageLogoComponent.length).toBe(1)
    })

    it('should render nav bar', () => {
        const wrapper = renderComponent();
        const navBarComponent = findByAttribute(wrapper, 'nav-bar-element-id');
        expect(navBarComponent.length).toBe(1)
    })

})