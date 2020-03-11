import React from 'react';
import { findByAttribute } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import RoundedButton, { Props } from './RoundedButton';


const onClickMock = jest.fn(()=> { })
const renderComponent = (props: Partial<Props> = {}) => {
    const defaultProps = {
        onClick:onClickMock,
    }
    const setProps = {
        ...defaultProps,
        ...props
    }
    const wrapper = shallow(<RoundedButton {...setProps} />);
    return wrapper;
}

describe('test App component', () => {
    it('should render the compoenent without error', () => {
        const wrapper = renderComponent();
        const roundedButtonComponent = findByAttribute(wrapper, 'rounded-button-component-id');
        expect(roundedButtonComponent.length).toBe(1)
    })

    it('should call onclick function when clicked', () => {
        const wrapper = renderComponent();
        const roundedButtonComponent = findByAttribute(wrapper, 'rounded-button-component-id');
        roundedButtonComponent.simulate('click');
        expect(onClickMock).toHaveBeenCalledTimes(1);

    })

})