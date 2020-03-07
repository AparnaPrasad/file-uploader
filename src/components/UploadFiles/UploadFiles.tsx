import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'

interface Props {
    setFilesToUpload: (filesToUpload: File[]) => void;
    filesToUpload: File[]
}

const UploadFiles = ({ setFilesToUpload, filesToUpload}:Props) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFilesToUpload(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <React.Fragment>
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
        {filesToUpload.length > 0 && <div>
                <h3>Uploaded files</h3>
                {filesToUpload.map((file: File, index: number) => (
                    <div key={index}>
                        {file.name}
                    </div>
                ))
                }
        </div>}
        </React.Fragment>
    )
}

export default UploadFiles;