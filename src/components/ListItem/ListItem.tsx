import React from 'react';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { bytesToSize, getFileType } from '../../utilities/helper';
export interface Props {
    file: File
}

const StyledFileName = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.875em;
    font-weight: 480;
`

const StyledFileDetails = styled.div`
    display: flex;
    font-size: 0.75em;
    color: #6a6d70;
    font-weight: 400;
`
const StyledFileDetailsItem = styled.div`
    padding: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ListItem = ({ file }: Props) => {
    return <ListGroup.Item data-test-id='list-item-component-id'>
        <StyledFileName data-test-id='file-name-element-id' >{file.name}</StyledFileName>
        <StyledFileDetails>
            <StyledFileDetailsItem data-test-id='file-size-element-id'>{bytesToSize(file.size)}</StyledFileDetailsItem>
            <StyledFileDetailsItem>.</StyledFileDetailsItem>
            <StyledFileDetailsItem data-test-id='file-type-element-id'>{getFileType(file.type)}</StyledFileDetailsItem>
        </StyledFileDetails>
    </ListGroup.Item>
}
export default ListItem;