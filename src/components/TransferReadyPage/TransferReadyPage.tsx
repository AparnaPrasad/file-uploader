import React from 'react';
import UploadFiles from '../UploadFiles/UploadFiles';
import { UploadStatusEnum } from '../../store/upload-reducer';
import RoundedButton from '../RoundedButton/RoundedButton';
import { Alert, Container } from 'react-bootstrap';
import { StyledRemainingHeightContainer, StyledButtonContainer } from '../StyledContainer/StyledContainer';
import commonStyles from '../../utilities/commonStyles';

interface Props {
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
        return uploadStatus === UploadStatusEnum.UPLOAD_CANCELLED ? "warning" : "danger"
    }

    const getAlertText = () => {
        return uploadStatus === UploadStatusEnum.UPLOAD_CANCELLED ? "Transfer was cancelled" : "There was an error transfering"
    }

    const getAlert = () => {
        if (uploadStatus !== UploadStatusEnum.UPLOAD_CANCELLED && uploadStatus !== UploadStatusEnum.UPLOAD_ERROR)
            return;
        return <StyledButtonContainer>
            <Alert variant={getVariant()} style={styles.alertStyle}>
                    {getAlertText()}
            </Alert>
        </StyledButtonContainer>
       

    }

    return <Container
        fluid style={commonStyles.containerStyle }>
        <StyledRemainingHeightContainer>
            <UploadFiles
            filesToUpload={filesToUpload} setFilesToUpload={setFilesToUpload} />
        </StyledRemainingHeightContainer>
        {getAlert()}
        <StyledButtonContainer>
            <RoundedButton onClick={() => { transferFiles() }}
                disabled={filesToUpload.length < 1}>
                Start Transfer
            </RoundedButton>
        </StyledButtonContainer>
    </Container>
}
export default TransferReadyPage;