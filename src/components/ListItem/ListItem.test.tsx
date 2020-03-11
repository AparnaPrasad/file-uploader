import React from 'react';
import { findByAttribute, mockFile } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import ListItem, { Props } from './ListItem';

const fileName = 'testFileName.jpg'
const file = mockFile(fileName, 1232, 'image/jpg');

const renderComponent = (props: Partial<Props> = {}) => {
    
    const defaultProps: Props = {
        file: file
    }
    const setProps = {
        ...defaultProps,
        ...props
    }
    const wrapper = shallow(<ListItem {...setProps} />);
    return wrapper;
}

describe('test ListItem component', () => {
    it('should render the component without error', () => {
        const wrapper = renderComponent();
        const listItemComponent = findByAttribute(wrapper,
            'list-item-component-id');
        expect(listItemComponent.length).toBe(1)
    })

    it('should display file name', () => {
        const wrapper = renderComponent();
        const fileNameElement = findByAttribute(wrapper,
            'file-name-element-id');
        expect(fileNameElement.length).toBe(1)
        expect(fileNameElement.text()).toBe(fileName)
    })

    it('should display file size', () => {
        const wrapper = renderComponent();
        const fileSizeElement = findByAttribute(wrapper,
            'file-size-element-id');
        expect(fileSizeElement.length).toBe(1);
        expect(fileSizeElement.text()).toBe('1 KB');
    })

    it('should display file type', () => {
        const wrapper = renderComponent();
        const fileTypeElement = findByAttribute(wrapper,
            'file-type-element-id');
        expect(fileTypeElement.length).toBe(1);
        expect(fileTypeElement.text()).toBe('jpg');
    })

})