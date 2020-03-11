import React from 'react';
import { findByAttribute } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import AddFileIcon from './AddFileIcon';



const renderComponent = () => {
    const wrapper = shallow(<AddFileIcon />);
    return wrapper;
}

describe('test AddFile icon', () => {
    it('should render the compoenent without error', () => {
        const wrapper = renderComponent();
        const addFileIconComponent = findByAttribute(wrapper, 'add-file-icon-test-id');
        expect(addFileIconComponent).toHaveLength(1)
    })

})