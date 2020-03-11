import React from 'react';
import { findByAttribute } from '../../utilities/testUtils';
import { shallow } from 'enzyme';
import TransferCard, { Props } from './TransferCard';
import { UploadStatusEnum } from '../../store/upload-reducer/upload-reducer';



const renderComponent = (props: Partial<Props> = {}) => {
    
    const defaultProps: Props = {
        uploadStatus: UploadStatusEnum.UPLOAD_READY_TO_START,
        uploadProgressPercent: 0,
        changeUploadStatus: jest.fn(() => { }),
        changeUploadProgress: jest.fn(() => { }),
        setFilesToUpload: jest.fn(() => { }),
        filesToUpload: [],
        uploadProgressSize: 0,
        filesToUploadSize: 0,
        uploadTimeLeft: 0
    }
    const setProps = {
        ...defaultProps,
        ...props
    }
    const wrapper = shallow(<TransferCard {...setProps} />);
    return wrapper;
}

describe('test Transfer component in progress or done', () => {
    it('should render the TransferLoaderPage when status is in progress status', () => {
        const wrapper = renderComponent({ uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS });
        const transferLoadingComponent = findByAttribute(wrapper, 'transfer-load-page-element-id');
        expect(transferLoadingComponent.length).toBe(1)
    })

    it('should still render TransferLoaderPage when status is done', () => {
        const wrapper = renderComponent({ uploadStatus: UploadStatusEnum.UPLOAD_DONE });
        const transferLoadingComponent = findByAttribute(wrapper, 'transfer-load-page-element-id');
        expect(transferLoadingComponent.length).toBe(1)

    })

})

describe('test Transfer component when status is not progress or done', () => {
    it('should render the TransferReadyPage when status is ready to start', () => {
        const wrapper = renderComponent({ uploadStatus: UploadStatusEnum.UPLOAD_READY_TO_START });
        const transferLoadingComponent = findByAttribute(wrapper, 'transfer-ready-page-element-id');
        expect(transferLoadingComponent.length).toBe(1)
    })

    it('should render the TransferReadyPage when status is error', () => {
        const wrapper = renderComponent({ uploadStatus: UploadStatusEnum.UPLOAD_ERROR });
        const transferLoadingComponent = findByAttribute(wrapper, 'transfer-ready-page-element-id');
        expect(transferLoadingComponent.length).toBe(1)
    })

    it('should render the TransferReadyPage when status is cancelled', () => {
        const wrapper = renderComponent({ uploadStatus: UploadStatusEnum.UPLOAD_CANCELLED });
        const transferLoadingComponent = findByAttribute(wrapper, 'transfer-ready-page-element-id');
        expect(transferLoadingComponent.length).toBe(1)
    })

})