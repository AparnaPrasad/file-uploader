import React from 'react';
import TransferCard from '../TransferCard/TransferCard';
import { useDispatch, useSelector } from 'react-redux';
import { UploadActionDispatcher, UploadStatusEnum } from '../../store/upload-reducer';
import { ApplicationState } from '../../store';

interface ReduxProps {
    uploadStatus: UploadStatusEnum,
    uploadProgressPercent: number,
    filesToUpload: File[],
    uploadProgressSize: number,
    filesToUploadSize: number
}

const TransferCardContainer = () => {

    const dispatch = useDispatch();
    const pageActionDispatcher = new UploadActionDispatcher(dispatch);
    const { changeUploadProgressPercent, changeUploadStatus, setFilesToUpload } = pageActionDispatcher;
    const { uploadStatus, uploadProgressPercent, filesToUpload,
        uploadProgressSize,
        filesToUploadSize
    } = useSelector<ApplicationState, ReduxProps>((state: ApplicationState) => {
        return {
            uploadStatus: state.uploadState.uploadStatus,
            uploadProgressPercent: state.uploadState.uploadProgressPercent,
            filesToUpload: state.uploadState.filesToUpload,
            uploadProgressSize: state.uploadState.uploadProgressSize,
            filesToUploadSize: state.uploadState.filesToUploadSize
        }
    });
    return <div>
        <TransferCard uploadStatus={uploadStatus}
            uploadProgressPercent={uploadProgressPercent}
            changeUploadStatus={changeUploadStatus}
            changeUploadProgressPercent={changeUploadProgressPercent}
            filesToUpload={filesToUpload}
            setFilesToUpload={setFilesToUpload}
            uploadProgressSize={uploadProgressSize}
            filesToUploadSize={filesToUploadSize}

        /> 
    </div>
}
export default TransferCardContainer;