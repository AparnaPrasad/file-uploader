import React from 'react';
import styled from 'styled-components';
import FilesList from '../FilesList/FilesList';
import DragAndDrop from '../DragAndDrop/DragAndDrop';

interface Props {
    setFilesToUpload: (filesToUpload: File[]) => void;
    filesToUpload: File[]
}

const StyledUploadFilesContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 10px;
`

const UploadFiles = ({ setFilesToUpload, filesToUpload}:Props) => {
    
    return (
        <StyledUploadFilesContainer>
            <FilesList filesToUpload={filesToUpload} />
            <DragAndDrop
                filesToUpload={filesToUpload}
                setFilesToUpload={setFilesToUpload} />
        </StyledUploadFilesContainer>
    )
}

export default UploadFiles;