import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import RoundedButton from '../RoundedButton/RoundedButton';
import styled from 'styled-components';
import  AddFile  from './AddFile';

interface Props {
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
    }, [filesToUpload]);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const hasFilesToUpload = filesToUpload.length > 0;
    const dropZoneStyle = hasFilesToUpload ? {} : styles.dropZoneWithoutFilesToUpload;

    const getAddFilesText = () => {
        return <StyledAddFilesContainer>
            <AddFile />
            <StyledTextContainer>
                <h5>{hasFilesToUpload ? 'Add more files' : 'Add your files'}</h5>
                <StyledDropText>or drop</StyledDropText>
            </StyledTextContainer>
        </StyledAddFilesContainer>
    }

    return <div style={{ ...styles.dropZone, ...dropZoneStyle }}  {...getRootProps()}>
        <input {...getInputProps()} />
        {
            getAddFilesText()
        }
    </div>

}
export default DragAndDrop;

