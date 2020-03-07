import React from 'react';
import Loader from '../Loader/Loader';
import { UploadStatusEnum } from '../../store/upload-reducer';
import { Canceler } from 'axios';

interface Props {
    uploadStatus: UploadStatusEnum,
    uploadProgressPercent: number,
    changeUploadStatus: (uploadStatus: UploadStatusEnum) => void,
    changeUploadProgressPercent: (uploadProgressPercent: number) => void,
    cancel: Canceler,
    setFilesToUpload: (files: File[]) => void;
}

const TransferLoaderPage = ({ uploadStatus,
    uploadProgressPercent,
    changeUploadStatus,
    changeUploadProgressPercent,
    cancel,
    setFilesToUpload
}: Props) => {
    const cancelTransfer = () => {
        changeUploadStatus(UploadStatusEnum.UPLOAD_CANCELLED);
        changeUploadProgressPercent(0)

        if (cancel) {
            cancel()
        }
    }

    const startNewTransfer = () => {
        changeUploadProgressPercent(0);
        setFilesToUpload([]);
        changeUploadStatus(UploadStatusEnum.UPLOAD_READY_TO_START);
    }

    return <React.Fragment>
        <Loader
            percent={uploadProgressPercent} />

        {uploadStatus === UploadStatusEnum.UPLOAD_IN_PROGRESS &&
            <button onClick={() => {
                cancelTransfer()
            }}>Cancel</button>
        }

        {uploadStatus === UploadStatusEnum.UPLOAD_DONE &&
            <button onClick={() => {
                startNewTransfer()
            }}>Start new transfer</button>
        }

    </React.Fragment>

}
export default TransferLoaderPage;