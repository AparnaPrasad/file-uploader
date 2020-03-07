import React from 'react';
import UploadFiles from '../UploadFiles/UploadFiles';
import { UploadStatusEnum } from '../../store/upload-reducer';

interface Props {
    filesToUpload: File[],
    setFilesToUpload: (files: File[]) => void,
    transferFiles: () => void,
    uploadStatus: UploadStatusEnum
}

const TransferReadyPage = ({
    filesToUpload,
    setFilesToUpload,
    transferFiles,
    uploadStatus
}: Props) => {

    return <React.Fragment>
        <UploadFiles
            filesToUpload={filesToUpload} setFilesToUpload={setFilesToUpload} />

        {filesToUpload.length > 0 && <button onClick={() => { transferFiles() }} >start transfer</button>}


        {uploadStatus === UploadStatusEnum.UPLOAD_CANCELLED &&
            <div>Transfer was cancelled</div>
        }


        {uploadStatus === UploadStatusEnum.UPLOAD_ERROR &&
            <div>There was an error transferring</div>
        }

    </React.Fragment>
}
export default TransferReadyPage;