import React from 'react';
import { findByAttribute, mockFile } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import UploadFiles, { Props } from './UploadFiles';


const renderComponent = (props: Partial<Props> = {}) => {
    const defaultProps = {
        setFilesToUpload: jest.fn(() => { }),
        filesToUpload: []
    }
    const setProps = {
        ...defaultProps,
        ...props
    }
    const wrapper = shallow(<UploadFiles {...setProps} />);
    return wrapper;
}

describe('test UploadFiles component', () => {
    it('should render the compoenent without error', () => {
        const wrapper = renderComponent();
        const uploadFilesComponent = findByAttribute(wrapper, 'upload-files-component-id');
        expect(uploadFilesComponent.length).toBe(1)
    })

    it('should render files list with filesToUpload', () => {
        const file1 = mockFile()
        const filesToUpload = [file1]
        const wrapper = renderComponent({ filesToUpload });
        const fileList = findByAttribute(wrapper, 'file-list-element-id');
        expect(fileList.length).toBe(1)
        expect(fileList.prop('filesToUpload')).toBe(filesToUpload)
    })


    it('should render drag and drop with filesToUpload and setFilesToUpload', () => {
        const file1 = mockFile()
        const filesToUpload = [file1]
        const setFilesToUpload = jest.fn(() => { })

        const wrapper = renderComponent({
            filesToUpload,
            setFilesToUpload
        });
        const fileList = findByAttribute(wrapper, 'drag-and-drop-element-id');
        expect(fileList.length).toBe(1)
        expect(fileList.prop('filesToUpload')).toBe(filesToUpload)
        expect(fileList.prop('setFilesToUpload')).toBe(setFilesToUpload)
            
    })

})