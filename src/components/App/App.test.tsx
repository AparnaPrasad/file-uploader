import React from 'react';
import { findByAttribute } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import App from './App';

const renderComponent = () => {
    const wrapper = shallow(<App />);
    return wrapper;
}

describe('test App component', () => {
    it('should render the compoenent without error', () => {
        const wrapper = renderComponent();
        const addFileIconComponent = findByAttribute(wrapper, 'app-component-id');
        expect(addFileIconComponent.length).toBe(1)
    })
})