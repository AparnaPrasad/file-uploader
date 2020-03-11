import React from 'react';
import Loader from '../Loader/Loader';
import { UploadStatusEnum } from '../../store/upload-reducer/upload-reducer';
import { Canceler } from 'axios';
import commonStyles from '../../utilities/commonStyles';
import { Container } from 'react-bootstrap';
import { StyledRemainingHeightContainer, StyledButtonContainer } from '../StyledContainer/StyledContainer';
import RoundedButton from '../RoundedButton/RoundedButton';
import styled from 'styled-components';
import { bytesToSize, millisToMinutes, pluralize } from '../../utilities/helper';
import constants from '../../utilities/constants';

export interface Props {
    uploadStatus: UploadStatusEnum,
    uploadProgressPercent: number,
    changeUploadStatus: (uploadStatus: UploadStatusEnum) => void,
    changeUploadProgress: (uploadProgressPercent: number, uploadProgressSize: number, uploadTimeRemaining: number) => void,
    cancel: Canceler,
    setFilesToUpload: (files: File[]) => void;
    numberOfFilesInUploadQueue: number,
    uploadProgressSize: number,
    filesToUploadSize: number,
    uploadTimeLeft: number
}

const StyledLoaderAndTextContainer = styled.div`
    align-items: center;
    padding: 20px;
    display: flex;
    flex-direction: column;
`
const StyledTransferingText = styled.div`
    font-size: 20px;
    font-weight: 500;
`

const StyledTransferDetailsContainer = styled.div`
    font-size: 12px;
    
`

const TransferLoaderPage = ({ uploadStatus,
    uploadProgressPercent,
    changeUploadStatus,
    changeUploadProgress,
    cancel,
    setFilesToUpload,
    numberOfFilesInUploadQueue,
    filesToUploadSize,
    uploadProgressSize,
    uploadTimeLeft
}: Props) => {
    const cancelTransfer = () => {
        changeUploadStatus(UploadStatusEnum.UPLOAD_CANCELLED);
        changeUploadProgress(0, 0, 0)
        if (cancel) {
            cancel()
        }
    }

    const startNewTransfer = () => {
        changeUploadProgress(0, 0, 0);
        setFilesToUpload([]);
        changeUploadStatus(UploadStatusEnum.UPLOAD_READY_TO_START);
    }

    const getButtonText = () => {
        return uploadStatus === UploadStatusEnum.UPLOAD_IN_PROGRESS ? constants.cancel : constants.anotherTransfer
    }

    const buttonClick = () => {
        if (uploadStatus === UploadStatusEnum.UPLOAD_IN_PROGRESS) {
            cancelTransfer();
            return;
        }
        startNewTransfer();
        return;
    }

    const getButton = () => {
        return <RoundedButton data-test-id='loader-page-button-element-id' variant='outline-primary' onClick={() => buttonClick()}>
            {getButtonText()}
        </RoundedButton>
    }

    const getTransferText = () => {
        return uploadStatus === UploadStatusEnum.UPLOAD_IN_PROGRESS ? constants.transferTextInProgress : constants.transferTextDone
    }
    const { time, unit } = millisToMinutes(uploadTimeLeft);
    return <Container
        data-test-id='transfer-loader-page'
        fluid style={commonStyles.containerStyle}>
        <StyledRemainingHeightContainer>
            <StyledLoaderAndTextContainer>
                <Loader
                    data-test-id='loader-element-id'
                    width={170}
                    strokeWidth={7}
                    percent={uploadProgressPercent} />
                <StyledTransferingText data-test-id='transfer-text-element-id'>
                    {getTransferText()}
                </StyledTransferingText>
                {uploadStatus === UploadStatusEnum.UPLOAD_IN_PROGRESS &&
                    (<React.Fragment>
                        <StyledTransferDetailsContainer data-test-id='file-upload-progress-element-id'>Sending {numberOfFilesInUploadQueue} {pluralize(numberOfFilesInUploadQueue, 'file')} to {1} recipient</StyledTransferDetailsContainer>
                        <StyledTransferDetailsContainer data-test-id='uploaded-size-element-id'>{bytesToSize(uploadProgressSize)} of {bytesToSize(filesToUploadSize)} uploaded</StyledTransferDetailsContainer>
                        <StyledTransferDetailsContainer data-test-id='upload-time-remaining-element-id'>{time} {pluralize(time, unit)} remaining</StyledTransferDetailsContainer>
                    </React.Fragment>)
                }
            </StyledLoaderAndTextContainer>
        </StyledRemainingHeightContainer>
        <StyledButtonContainer>
            {(uploadStatus === UploadStatusEnum.UPLOAD_IN_PROGRESS || uploadStatus === UploadStatusEnum.UPLOAD_DONE) && getButton()}
        </StyledButtonContainer>
    </Container>

}
export default TransferLoaderPage;