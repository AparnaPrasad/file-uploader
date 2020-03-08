import React from 'react';
import Loader from '../Loader/Loader';
import { UploadStatusEnum } from '../../store/upload-reducer';
import { Canceler } from 'axios';
import commonStyles from '../../utilities/commonStyles';
import { Container } from 'react-bootstrap';
import { StyledRemainingHeightContainer, StyledButtonContainer } from '../StyledContainer/StyledContainer';
import RoundedButton from '../RoundedButton/RoundedButton';
import styled from 'styled-components';
import { bytesToSize } from '../../utilities/helper';
interface Props {
    uploadStatus: UploadStatusEnum,
    uploadProgressPercent: number,
    changeUploadStatus: (uploadStatus: UploadStatusEnum) => void,
    changeUploadProgressPercent: (uploadProgressPercent: number, uploadProgressSize: number) => void,
    cancel: Canceler,
    setFilesToUpload: (files: File[]) => void;
    numberOfFilesInUploadQueue: number,
    uploadProgressSize: number,
    filesToUploadSize: number
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
    changeUploadProgressPercent,
    cancel,
    setFilesToUpload,
    numberOfFilesInUploadQueue,
    filesToUploadSize,
    uploadProgressSize
}: Props) => {
    const cancelTransfer = () => {
        changeUploadStatus(UploadStatusEnum.UPLOAD_CANCELLED);
        changeUploadProgressPercent(0, 0)
        if (cancel) {
            cancel()
        }
    }

    const startNewTransfer = () => {
        changeUploadProgressPercent(0, 0);
        setFilesToUpload([]);
        changeUploadStatus(UploadStatusEnum.UPLOAD_READY_TO_START);
    }

    const getButtonText = () => {
        return uploadStatus === UploadStatusEnum.UPLOAD_IN_PROGRESS ? 'Cancel' : 'Another Transfer?'
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
        return <RoundedButton variant='outline-primary' onClick={() => buttonClick()}>
            {getButtonText()}
        </RoundedButton>
    }

    const getTransferText = () => {
        return uploadStatus === UploadStatusEnum.UPLOAD_IN_PROGRESS ? 'Transferring...': 'Done!'
    }

    return <Container
        fluid style={commonStyles.containerStyle}>
        <StyledRemainingHeightContainer>
            <StyledLoaderAndTextContainer>
                <Loader
                    width={170}
                    strokeWidth={7}
                    percent={uploadProgressPercent} />
                <StyledTransferingText>
                    {getTransferText()}
                </StyledTransferingText>

                {uploadStatus === UploadStatusEnum.UPLOAD_IN_PROGRESS &&
                    (<React.Fragment>
                    <StyledTransferDetailsContainer>Sending {numberOfFilesInUploadQueue} {numberOfFilesInUploadQueue === 1 ? 'file': 'files'} to {1} recipient</StyledTransferDetailsContainer>
                    <StyledTransferDetailsContainer>{bytesToSize(uploadProgressSize)} of {bytesToSize(filesToUploadSize)} uploaded</StyledTransferDetailsContainer>
                        <StyledTransferDetailsContainer>x minutes remaining</StyledTransferDetailsContainer>
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