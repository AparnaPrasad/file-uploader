import React from 'react';
import TransferCard from '../TransferCard/TransferCard';
import { useDispatch, useSelector } from 'react-redux';
import { UploadActionDispatcher, UploadStatusEnum } from '../../store/upload-reducer/upload-reducer';
import { ApplicationState } from '../../store';

interface ReduxProps {
    uploadStatus: UploadStatusEnum,
    uploadProgressPercent: number,
    filesToUpload: File[],
    uploadProgressSize: number,
    filesToUploadSize: number,
    uploadTimeLeft: number

}

const TransferCardContainer = () => {

    const dispatch = useDispatch();
    const pageActionDispatcher = new UploadActionDispatcher(dispatch);
    const { changeUploadProgress, changeUploadStatus, setFilesToUpload } = pageActionDispatcher;
    const { uploadStatus, uploadProgressPercent, filesToUpload,
        uploadProgressSize,
        filesToUploadSize,
        uploadTimeLeft
    } = useSelector<ApplicationState, ReduxProps>((state: ApplicationState) => {
        return {
            uploadStatus: state.uploadState.uploadStatus,
            uploadProgressPercent: state.uploadState.uploadProgressPercent,
            filesToUpload: state.uploadState.filesToUpload,
            uploadProgressSize: state.uploadState.uploadProgressSize,
            filesToUploadSize: state.uploadState.filesToUploadSize,
            uploadTimeLeft: state.uploadState.uploadTimeLeft
        }
    });
    return <div data-test-id='transfer-card-component-id'>
    <TransferCard
            uploadStatus={uploadStatus}
            uploadProgressPercent={uploadProgressPercent}
            changeUploadStatus={changeUploadStatus}
            changeUploadProgress={changeUploadProgress}
            filesToUpload={filesToUpload}
            setFilesToUpload={setFilesToUpload}
            uploadProgressSize={uploadProgressSize}
            filesToUploadSize={filesToUploadSize}
            uploadTimeLeft={uploadTimeLeft}
        />
        </div>
}
export default TransferCardContainer;