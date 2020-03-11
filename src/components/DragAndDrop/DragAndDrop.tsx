import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components';
import AddFile from '../AddFileIcon/AddFileIcon';
import constants from '../../utilities/constants';

export interface Props {
    setFilesToUpload: (files: File[]) => void,
    filesToUpload: File[]
}

const StyledAddFilesContainer = styled.div`
    display: flex;
    align-items: center
`
const StyledDropText = styled.div`
    font-size: 12px
`
const StyledTextContainer = styled.div`
    margin-left: 10px
`
const styles = {
    dropZone: {
        cursor: 'pointer',
        padding: '10px'
    },
    dropZoneWithoutFilesToUpload: {
        height: '100%',
        display: 'flex'
    }
}


const DragAndDrop = ({ setFilesToUpload, filesToUpload}: Props) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFilesToUpload(filesToUpload.concat(acceptedFiles));
    }, [filesToUpload, setFilesToUpload]);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const hasFilesToUpload = filesToUpload.length > 0;
    const dropZoneStyle = hasFilesToUpload ? {} : styles.dropZoneWithoutFilesToUpload;
    const { uploadTextAddMore, uploadTextAddFiles } = constants;
    const getAddFilesText = () => {
        return <StyledAddFilesContainer>
            <AddFile />
            <StyledTextContainer>
                <h5 data-test-id='add-files-text-element-id'>{hasFilesToUpload ? uploadTextAddMore : uploadTextAddFiles}</h5>
                <StyledDropText>or drop</StyledDropText>
            </StyledTextContainer>
        </StyledAddFilesContainer>
    }

    return <div data-test-id='drag-and-drop-component-id' style={{ ...styles.dropZone, ...dropZoneStyle }}  {...getRootProps()}>
        <input {...getInputProps()} />
        {
            getAddFilesText()
        }
    </div>

}
export default DragAndDrop;

