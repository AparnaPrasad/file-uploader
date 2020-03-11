import React from 'react';
import { findByAttribute, mockFile } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import TransferReadyPage, { Props } from './TransferReadyPage';
import { UploadStatusEnum } from '../../store/upload-reducer/upload-reducer';
//import constants from '../../utilities/constants';

const renderComponent = (props: Partial<Props> = {}) => {

    const defaultProps: Props = {
        filesToUpload: [],
        setFilesToUpload: jest.fn(() => { }),
        transferFiles: jest.fn(() => { }),
        uploadStatus: UploadStatusEnum.UPLOAD_READY_TO_START
    }
    const setProps = {
        ...defaultProps,
        ...props
    }
    const wrapper = shallow(<TransferReadyPage {...setProps} />);
    return wrapper;
}

describe('test TransferLoaderPage component', () => {
    it('should render the component without error', () => {
        const wrapper = renderComponent({ uploadStatus: UploadStatusEnum.UPLOAD_READY_TO_START });
        const transferReadyComponent = findByAttribute(wrapper, 'transfer-ready-component-id');
        expect(transferReadyComponent.length).toBe(1)
    })

    it('should render upload files component with setFilesToUpload function', () => {

        const setFilesToUpload = jest.fn(() => { })
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_READY_TO_START,
            setFilesToUpload,
            filesToUpload: []
        });
        const uploadFiles = findByAttribute(wrapper, 'upload-files-element-id');
        expect(uploadFiles.length).toBe(1)
        expect(uploadFiles.props()).toEqual(expect.objectContaining({
            filesToUpload: [],
            setFilesToUpload
        }))
    })

    it ('should disable the start transfer button when no files to upload', () => {
        const setFilesToUpload = jest.fn(() => { })
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_READY_TO_START,
            setFilesToUpload,
            filesToUpload: []
        });
        const startTransferButton = findByAttribute(wrapper, 'start-transfer-element-id');
        expect(startTransferButton.length).toBe(1)
        expect(startTransferButton.prop('disabled')).toBeTruthy()
    })

    it('should enable the start transfer button when there are files to upload', () => {
        const file1 = mockFile();
        const file2 = mockFile();
        const file3 = mockFile();
        const wrapper = renderComponent({
            filesToUpload: [file1, file2, file3]
        });
        const startTransferButton = findByAttribute(wrapper, 'start-transfer-element-id');
        expect(startTransferButton.length).toBe(1)
        expect(startTransferButton.prop('disabled')).toBeFalsy()
    })

    it('should call transferFiles on clicking transfer button', () => {
        const file1 = mockFile();
        const file2 = mockFile();
        const file3 = mockFile();
        const transferFiles = jest.fn(() => { })
        const wrapper = renderComponent({
            filesToUpload: [file1, file2, file3],
            transferFiles
        });
        const startTransferButton = findByAttribute(wrapper, 'start-transfer-element-id');
        expect(startTransferButton.length).toBe(1)
        startTransferButton.simulate('click');
        expect(transferFiles).toBeCalledTimes(1)
    })

    it('should contain error alert when status is UPLOAD_ERROR', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_ERROR
        });
        const alertBox = findByAttribute(wrapper, 'alert-box-element-id');
        expect(alertBox.length).toBe(1)
        expect(alertBox.prop('variant')).toBe('danger')
    })

    it('should contain warning alert when status is UPLOAD_CANCELED', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_CANCELLED
        });
        const alertBox = findByAttribute(wrapper, 'alert-box-element-id');
        expect(alertBox.length).toBe(1)
        expect(alertBox.props()).toEqual(expect.objectContaining({ variant: 'warning' }))
    })
})