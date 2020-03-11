import React from 'react';
import { findByAttribute, mockFile } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import DragAndDrop, { Props } from './DragAndDrop';
import constants from '../../utilities/constants';

const renderComponent = (props: Partial<Props> = {}) => {
    const defaultProps: Props = {
        filesToUpload: [],
        setFilesToUpload: () => { }
    }
    const setProps = {
        ...defaultProps,
        ...props
    }
    const wrapper = shallow(<DragAndDrop {...setProps} />);
    return wrapper;
}

describe('test DragAndDrop component when there are files to upload', () => {
    it('should render the compoenent without error', () => {
        const file1 = mockFile();
        const file2 = mockFile();
        const file3 = mockFile();
        const filesToUpload = [file1, file2, file3]
        const props = {
            filesToUpload
        }
        const wrapper = renderComponent(props);
        const addFileIconComponent = findByAttribute(wrapper, 'drag-and-drop-component-id');
        expect(addFileIconComponent.length).toBe(1)
    })

    it('should render "add more files" text when there are files present in queue', () => {
        /*checks the text here but both test case and 
         * compoent getting from constant */
        const file1 = mockFile();
        const file2 = mockFile();
        const file3 = mockFile();
        const filesToUpload = [file1, file2, file3]
        const props = {
            filesToUpload
        }
        const wrapper = renderComponent(props);
        const addFileIconComponent = findByAttribute(wrapper, 'add-files-text-element-id');
        expect(addFileIconComponent.text()).toBe(constants.uploadTextAddMore)
    })



})

describe('test DragAndDrop component when there are no files to upload', () => {
    it('should render the compoenent without error', () => {

        const props = {
            filesToUpload: []
        }
        const wrapper = renderComponent(props);
        const addFileIconComponent = findByAttribute(wrapper, 'drag-and-drop-component-id');
        expect(addFileIconComponent.length).toBe(1)
    })
    it('should render "add your files" text when there are files present in queue', () => {
        /*checks the text here but both test case and 
         * compoent getting from constant */
        const props = {
            filesToUpload: []
        }
        const wrapper = renderComponent(props);
        const addFileIconComponent = findByAttribute(wrapper, 'add-files-text-element-id');
        expect(addFileIconComponent.text()).toBe(constants.uploadTextAddFiles)
    })
})