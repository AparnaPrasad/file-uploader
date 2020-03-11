import React from 'react';
import styled from 'styled-components';
import { StyledRemainingHeightContainer } from '../StyledContainer/StyledContainer';
import { ListGroup } from 'react-bootstrap';
import ListItem from '../ListItem/ListItem';

export interface Props {
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
    return <StyledRemainingHeightContainer data-test-id='file-list-component-id'>
        <StyledUploadFilesHeader data-test-id='uploaded-files-header-element-id'>Uploaded files</StyledUploadFilesHeader>
        <StyledRemainingHeightContainer>
            <ListGroup data-test-id="file-list-element-id">
                {filesToUpload.map((file: File, index: number) => (
                    <ListItem key={index} file={file} />
                ))}
        </ListGroup>
        </StyledRemainingHeightContainer>
    </StyledRemainingHeightContainer>
}
export default FilesList;