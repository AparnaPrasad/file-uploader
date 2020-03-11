import React from 'react';
import UploadFiles from '../UploadFiles/UploadFiles';
import { UploadStatusEnum } from '../../store/upload-reducer/upload-reducer';
import RoundedButton from '../RoundedButton/RoundedButton';
import { Alert, Container } from 'react-bootstrap';
import { StyledRemainingHeightContainer, StyledButtonContainer } from '../StyledContainer/StyledContainer';
import commonStyles from '../../utilities/commonStyles';
import constants from '../../utilities/constants';

export interface Props {
    filesToUpload: File[],
    setFilesToUpload: (files: File[]) => void,
    transferFiles: () => void,
    uploadStatus: UploadStatusEnum
}

const styles = {
    
    alertStyle: {
        margin: 0
    }
}

const TransferReadyPage = ({
    filesToUpload,
    setFilesToUpload,
    transferFiles,
    uploadStatus
}: Props) => {
    const getVariant = () => {
        return uploadStatus === UploadStatusEnum.UPLOAD_CANCELLED ? 'warning'  : 'danger'
    }

    const getAlertText = () => {
        return uploadStatus === UploadStatusEnum.UPLOAD_CANCELLED ? constants.alertCancelledText : constants.alertErrorText
    }

    const getAlert = () => {
        if (uploadStatus !== UploadStatusEnum.UPLOAD_CANCELLED && uploadStatus !== UploadStatusEnum.UPLOAD_ERROR)
            return;
        return <StyledButtonContainer>
            <Alert data-test-id='alert-box-element-id' variant={getVariant()} style={styles.alertStyle}>
                    {getAlertText()}
            </Alert>
        </StyledButtonContainer>
    }

    return <Container
        data-test-id='transfer-ready-component-id'
        fluid style={commonStyles.containerStyle }>
        <StyledRemainingHeightContainer>
            <UploadFiles
                data-test-id='upload-files-element-id'
                filesToUpload={filesToUpload} setFilesToUpload={setFilesToUpload} />
        </StyledRemainingHeightContainer>
        {getAlert()}
        <StyledButtonContainer>
            <RoundedButton data-test-id='start-transfer-element-id' onClick={() => { transferFiles() }}
                disabled={filesToUpload.length < 1}>
                Start Transfer
            </RoundedButton>
        </StyledButtonContainer>
    </Container>
}
export default TransferReadyPage;