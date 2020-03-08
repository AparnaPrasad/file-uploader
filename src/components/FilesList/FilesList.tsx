import React from 'react';
import styled from 'styled-components';
import { StyledRemainingHeightContainer } from '../StyledContainer/StyledContainer';
import { ListGroup } from 'react-bootstrap';
import ListItem from '../ListItem/ListItem';

interface Props {
    filesToUpload: File[]
}

const StyledUploadFilesHeader = styled.div`
    font-weight: bold;
    text-transform: capitalize;
    padding: 10px 0;
`

const FilesList = ({ filesToUpload }: Props) => {
    if (!filesToUpload.length)
        return null;
    return <StyledRemainingHeightContainer>
        <StyledUploadFilesHeader>Uploaded files</StyledUploadFilesHeader>
        <StyledRemainingHeightContainer>
            <ListGroup >
                {filesToUpload.map((file: File, index: number) => (
                    <ListItem key={index} file={file} />
                ))}
        </ListGroup>
        </StyledRemainingHeightContainer>
    </StyledRemainingHeightContainer>
}
export default FilesList;