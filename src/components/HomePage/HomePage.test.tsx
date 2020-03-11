import React from 'react';
import { findByAttribute } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import HomePage from './HomePage';

const renderComponent = () => {
    const wrapper = shallow(<HomePage />);
    return wrapper;
}

describe('test HomePage component', () => {
    it('should render the component without error', () => {
        const wrapper = renderComponent();
        const homePageComponent = findByAttribute(wrapper, 'home-page-component-id');
        expect(homePageComponent.length).toBe(1)
    })

    it('should render header component', () => {
        const wrapper = renderComponent();
        const headerElement = findByAttribute(wrapper, 'header-element-id');
        expect(headerElement.length).toBe(1)
    })

    it('should render nav bar', () => {
        const wrapper = renderComponent();
        const transferCardContainer = findByAttribute(wrapper, 'transfer-card-container-element-id');
        expect(transferCardContainer.length).toBe(1)
    })

})