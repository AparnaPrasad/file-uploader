import React from 'react';
import { UploadStatusEnum } from '../../store/upload-reducer/upload-reducer';
import axios, { Canceler } from 'axios';
import TransferLoaderPage from '../TransferLoaderPage/TransferLoaderPage';
import TransferReadyPage from '../TransferReadyPage/TransferReadyPage';
import styled from 'styled-components';

export interface Props {
    uploadStatus: UploadStatusEnum,
    uploadProgressPercent: number,
    changeUploadStatus: (uploadStatus: UploadStatusEnum) => void,
    changeUploadProgress: (uploadProgressPrecent: number, uploadProgressSize: number, uploadTimeRemaining: number) => void,
    setFilesToUpload: (filesToUpload: File[]) => void;
    filesToUpload: File[],
    uploadProgressSize: number,
    filesToUploadSize: number,
    uploadTimeLeft: number
}

const StyledTransferCard = styled.div`
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 12px 0 rgba(0,0,0,0.1), 0 10px 30px 0 rgba(0,0,0,0.2);
    height: 25.625em;
    left: 5em;
    margin: -12.8125em 0 0;
    position: absolute;
    top: 50%;
    -webkit-transition: -webkit-transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
    transition: -webkit-transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
    transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
    transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1),-webkit-transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
    width: 17.5em;
    z-index: 30;
`

let cancel: Canceler;
const TransferCard = ({ uploadStatus,
    filesToUpload,
    uploadProgressPercent,
    changeUploadStatus,
    changeUploadProgress,
    setFilesToUpload,
    filesToUploadSize,
    uploadProgressSize,
    uploadTimeLeft
}: Props) => {
    
    const transferFiles = () => {
        const formData = new FormData();
        filesToUpload.map((file: any) => (formData.append('file', file)))
        changeUploadStatus(UploadStatusEnum.UPLOAD_IN_PROGRESS);
        const transferStartTime = Date.now();
        axios({
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
            url: 'http://www.mocky.io/v2/5e29b0b93000006500faf227',
            onUploadProgress: (ev: ProgressEvent) => {
                const progress = ev.loaded / ev.total * 100;
                const dataTransferRemaining = filesToUploadSize - ev.loaded;
                const timeElapsed = Date.now() - transferStartTime;
                const timeRemaining = (dataTransferRemaining / ev.loaded) * timeElapsed
                changeUploadProgress(Math.round(progress), ev.loaded, timeRemaining);

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

    let page = <TransferReadyPage
        data-test-id='transfer-ready-page-element-id'
        filesToUpload={filesToUpload}
        setFilesToUpload={setFilesToUpload}
        transferFiles={transferFiles}
        uploadStatus={uploadStatus}
    />

    if (uploadStatus === UploadStatusEnum.UPLOAD_IN_PROGRESS || uploadStatus === UploadStatusEnum.UPLOAD_DONE) {
        page = <TransferLoaderPage
            data-test-id='transfer-load-page-element-id'
            cancel={cancel}
            changeUploadProgress={changeUploadProgress}
            changeUploadStatus={changeUploadStatus}
            setFilesToUpload={setFilesToUpload}
            uploadProgressPercent={uploadProgressPercent}
            uploadStatus={uploadStatus}
            numberOfFilesInUploadQueue={filesToUpload.length}
            uploadProgressSize={uploadProgressSize}
            filesToUploadSize={filesToUploadSize}
            uploadTimeLeft={uploadTimeLeft}
        />
    }
    
    return <StyledTransferCard>
        {page}
    </StyledTransferCard>
  
}
export default TransferCard;

