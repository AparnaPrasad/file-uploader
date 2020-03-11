import React from 'react';
import { findByAttribute, mockFile } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import FileList, { Props } from './FilesList';

const renderComponent = (props: Partial<Props> = {}) => {
    const defaultProps: Props = {
        filesToUpload: [],
    }
    const setProps = {
        ...defaultProps,
        ...props
    }
    const wrapper = shallow(<FileList {...setProps} />);
    return wrapper;
}

describe('test FileList component', () => {

    it('should return null when there are no files', () => {
        const props = {
            filesToUpload: []
        }
        const wrapper = renderComponent(props);
        expect(wrapper.isEmptyRender()).toBeTruthy()
    })

    it('should render uploaded files header when there are files to upload', () => {
        const file1 = mockFile();
        const file2 = mockFile();
        const file3 = mockFile();
        const filesToUpload = [file1, file2, file3]
        const props = {
            filesToUpload
        }
        const wrapper = renderComponent(props);
        const fileListHeader = findByAttribute(wrapper, 'uploaded-files-header-element-id');
        expect(fileListHeader.length).toBe(1)
    })

    it('should render FileList component without error when there are files', () => {
        const file1 = mockFile();
        const file2 = mockFile();
        const file3 = mockFile();
        const filesToUpload = [file1, file2, file3]
        const props = {
            filesToUpload
        }
        const wrapper = renderComponent(props);
        const fileListComponent = findByAttribute(wrapper, 'file-list-component-id');
        expect(fileListComponent.length).toBe(1)
    })
    

    it('should render list of files equal to the filesToUpload', () => {
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
        const fileListContainer = findByAttribute(wrapper, 'file-list-element-id');
        expect(fileListContainer.children().length).toBe(3)
    })

})