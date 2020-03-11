import React from 'react';
import { findByAttribute } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import TransferLoaderPage, { Props } from './TransferLoaderPage';
import { UploadStatusEnum } from '../../store/upload-reducer/upload-reducer';
import constants from '../../utilities/constants';

const renderComponent = (props: Partial<Props> = {}) => {

    const defaultProps: Props = {
        uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS,
        uploadProgressPercent: 10,
        changeUploadStatus: jest.fn(() => { }),
        changeUploadProgress: jest.fn(() => { }),
        cancel: jest.fn(() => { }),
        setFilesToUpload: jest.fn(() => { }),
        numberOfFilesInUploadQueue: 10,
        uploadProgressSize: 1234,
        filesToUploadSize: 12344,
        uploadTimeLeft: 234532
    }
    const setProps = {
        ...defaultProps,
        ...props
    }
    const wrapper = shallow(<TransferLoaderPage {...setProps} />);
    return wrapper;
}

describe('test TransferLoaderPage component when status is UPLOAD_IN_PROGRESS', () => {
    it('should render the component without error', () => {
        const wrapper = renderComponent({ uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS });
        const transferLoadingComponent = findByAttribute(wrapper, 'transfer-loader-page');
        expect(transferLoadingComponent.length).toBe(1)
    })

    it('should call loader with uploadProgressPercent prop', () => {
        const percent = 10;
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS,
            uploadProgressPercent: percent
        });
        const loadingComponent = findByAttribute(wrapper, 'loader-element-id');
        expect(loadingComponent.length).toBe(1)
        expect(loadingComponent.props()).toEqual(expect.objectContaining({ percent }))
    })

    it('should display transfer in progress text', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS
        });
        const transferText = findByAttribute(wrapper, 'transfer-text-element-id');
        expect(transferText.length).toBe(1)
        expect(transferText.text()).toBe(constants.transferTextInProgress)
    })

    it('should display number of files{plural} sending to recipients', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS,
            numberOfFilesInUploadQueue: 5
        });
        const fileUploadProgress = findByAttribute(wrapper, 'file-upload-progress-element-id');
        expect(fileUploadProgress.length).toBe(1)
        expect(fileUploadProgress.text()).toBe('Sending 5 files to 1 recipient')
    })

    it('should display number of file{singular} sending to recipients', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS,
            numberOfFilesInUploadQueue: 1
        });
        const fileUploadProgress = findByAttribute(wrapper, 'file-upload-progress-element-id');
        expect(fileUploadProgress.length).toBe(1)
        expect(fileUploadProgress.text()).toBe('Sending 1 file to 1 recipient')
    })

    it('should display upload progress size and total size', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS,
            uploadProgressSize: 1024, //1KB
            filesToUploadSize: 1024 * 3 //3KB

        });
        const fileUploadProgress = findByAttribute(wrapper, 'uploaded-size-element-id');
        expect(fileUploadProgress.length).toBe(1)
        expect(fileUploadProgress.text()).toBe('1 KB of 3 KB uploaded')
    })

    it('should display upload time remaining in minutes as 1 minute {singular}', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS,
            uploadTimeLeft: 60000 //1 minute
        });
        const fileUploadProgress = findByAttribute(wrapper, 'upload-time-remaining-element-id');
        expect(fileUploadProgress.length).toBe(1)
        expect(fileUploadProgress.text()).toBe('1 minute remaining')
    })

    it('should display upload time remaining in minutes as 2 minutes {singular}', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS,
            uploadTimeLeft: 120000 //2 minute2
        });
        const fileUploadProgress = findByAttribute(wrapper, 'upload-time-remaining-element-id');
        expect(fileUploadProgress.length).toBe(1)
        expect(fileUploadProgress.text()).toBe('2 minutes remaining')
    })

    it('should display upload time remaining in second as 1 second {singular}', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS,
            uploadTimeLeft: 1000 //1 second
        });
        const fileUploadProgress = findByAttribute(wrapper, 'upload-time-remaining-element-id');
        expect(fileUploadProgress.length).toBe(1)
        expect(fileUploadProgress.text()).toBe('1 second remaining')
    })

    it('should display upload time remaining in second as 1 seconds {plural}', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS,
            uploadTimeLeft: 2000 //2 seconds
        });
        const fileUploadProgress = findByAttribute(wrapper, 'upload-time-remaining-element-id');
        expect(fileUploadProgress.length).toBe(1)
        expect(fileUploadProgress.text()).toBe('2 seconds remaining')
    })

    it('should display cancel button when upload is in progress', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS,
            
        });
        const button = findByAttribute(wrapper, 'loader-page-button-element-id');
        expect(button.length).toBe(1)
        expect(button.children().text()).toBe(constants.cancel)
    })

    it('should call cancelTransfer when button is clicked when upload is in progress', () => {
        const mockCancel = jest.fn(() => { })
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS,
            cancel: mockCancel
        });
        const button = findByAttribute(wrapper, 'loader-page-button-element-id');
        button.simulate('click');
        expect(mockCancel).toBeCalledTimes(1)
    })

    it('should change upload status to cancelled and reset progress when cancel button is clicked', () => {
        const mockChangeUploadStatus = jest.fn(() => { })
        const mockChangeUploadProgress = jest.fn(() => { })
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS,
            changeUploadStatus: mockChangeUploadStatus,
            changeUploadProgress: mockChangeUploadProgress 
        });
        const button = findByAttribute(wrapper, 'loader-page-button-element-id');
        button.simulate('click');
        expect(mockChangeUploadStatus).toBeCalledWith(UploadStatusEnum.UPLOAD_CANCELLED)
        expect(mockChangeUploadStatus.mock.calls.length).toBe(1)
        expect(mockChangeUploadProgress).toBeCalledWith(0, 0, 0)
        expect(mockChangeUploadProgress.mock.calls.length).toBe(1)
    })

})


describe('test TransferLoaderPage component when status is UPLOAD_DONE', () => {
    it('should render the component without error', () => {
        const wrapper = renderComponent({ uploadStatus: UploadStatusEnum.UPLOAD_DONE });
        const transferLoadingComponent = findByAttribute(wrapper, 'transfer-loader-page');
        expect(transferLoadingComponent.length).toBe(1)
    })

    it('should call loader with uploadProgressPercent prop', () => {
        const percent = 100;
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_DONE,
            uploadProgressPercent: percent
        });
        const loadingComponent = findByAttribute(wrapper, 'loader-element-id');
        expect(loadingComponent.length).toBe(1)
        expect(loadingComponent.props()).toEqual(expect.objectContaining({ percent }))
    })

    it('should display transfer DONE! text', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_DONE
        });
        const transferText = findByAttribute(wrapper, 'transfer-text-element-id');
        expect(transferText.length).toBe(1)
        expect(transferText.text()).toBe(constants.transferTextDone)
    })

    it('should display "another transfer?" button when upload is in progress', () => {
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_DONE,

        });
        const button = findByAttribute(wrapper, 'loader-page-button-element-id');
        expect(button.length).toBe(1)
        expect(button.children().text()).toBe(constants.anotherTransfer)
    })


    it('should change upload status to UPLOAD_READY_TO_START and reset progress and files when "another transfer?" is clicked', () => {
        const mockChangeUploadStatus = jest.fn(() => { })
        const mockChangeUploadProgress = jest.fn(() => { })
        const mockSetFilesToUpload = jest.fn(() => {})
        const wrapper = renderComponent({
            uploadStatus: UploadStatusEnum.UPLOAD_DONE,
            changeUploadStatus: mockChangeUploadStatus,
            changeUploadProgress: mockChangeUploadProgress,
            setFilesToUpload: mockSetFilesToUpload
        });
        const button = findByAttribute(wrapper, 'loader-page-button-element-id');
        button.simulate('click');
        expect(mockChangeUploadStatus).toBeCalledWith(UploadStatusEnum.UPLOAD_READY_TO_START)
        expect(mockChangeUploadStatus.mock.calls.length).toBe(1)
        expect(mockChangeUploadProgress).toBeCalledWith(0, 0, 0)
        expect(mockChangeUploadProgress.mock.calls.length).toBe(1)
        expect(mockSetFilesToUpload).toBeCalledWith([])
        expect(mockChangeUploadProgress.mock.calls.length).toBe(1)
    })

})



