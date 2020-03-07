import React from 'react';
import { UploadStatusEnum } from '../../store/upload-reducer';
import axios, { Canceler } from 'axios';
import TransferLoaderPage from '../TransferLoaderPage/TransferLoaderPage';
import TransferReadyPage from '../TransferReadyPage/TransferReadyPage';

interface Props {
    uploadStatus: UploadStatusEnum,
    uploadProgressPercent: number,
    changeUploadStatus: (uploadStatus: UploadStatusEnum) => void,
    changeUploadProgressPercent: (uploadProgressPrecent: number) => void,
    setFilesToUpload: (filesToUpload: File[]) => void;
    filesToUpload: File[]
}
let cancel: Canceler;
const TransferCard = ({ uploadStatus,
    filesToUpload,
    uploadProgressPercent,
    changeUploadStatus,
    changeUploadProgressPercent,
    setFilesToUpload
}: Props) => {
    
    const transferFiles = () => {
        const formData = new FormData();
        filesToUpload.map((file: any) => (formData.append('file', file)))
        changeUploadStatus(UploadStatusEnum.UPLOAD_IN_PROGRESS);
        axios({
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
            url: 'http://www.mocky.io/v2/5e29b0b93000006500faf227',
            onUploadProgress: (ev: ProgressEvent) => {
                    const progress = ev.loaded / ev.total * 100;
                    changeUploadProgressPercent(Math.round(progress));
            },
            cancelToken: new axios.CancelToken(function executor(c) {
                    cancel = c;
            })
            
        }).then((resp) => {
            if (resp.status === 200) {
                changeUploadStatus(UploadStatusEnum.UPLOAD_DONE);
            }
        }).catch((error) => {
            if (axios.isCancel(error)) {
                return
            }
            changeUploadStatus(UploadStatusEnum.UPLOAD_ERROR);
        });
    }
    
    if (uploadStatus === UploadStatusEnum.UPLOAD_IN_PROGRESS || uploadStatus === UploadStatusEnum.UPLOAD_DONE) {
        return <TransferLoaderPage
            cancel={cancel}
            changeUploadProgressPercent={changeUploadProgressPercent}
            changeUploadStatus={changeUploadStatus}
            setFilesToUpload={setFilesToUpload}
            uploadProgressPercent={uploadProgressPercent}
            uploadStatus={uploadStatus}
        />
    }
    
    return <TransferReadyPage
        filesToUpload={filesToUpload}
        setFilesToUpload={setFilesToUpload}
        transferFiles={transferFiles}
        uploadStatus={uploadStatus}
    />
  
}
export default TransferCard;

