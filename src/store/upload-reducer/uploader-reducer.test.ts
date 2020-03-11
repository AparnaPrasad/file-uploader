import { uploadReducer, UploadActionType, initialState, UploadStatusEnum } from './upload-reducer';
import { mockFile } from '../../utilities/testUtils';

/*Test action CHANGE_UPLOAD_STATUS*/
describe('test UploadActionType CHANGE_UPLOAD_STATUS', () => {
    it('should change status on CHANGE_UPLOAD_STATUS action', () => {
        expect(
            uploadReducer(initialState, {
                type: UploadActionType.CHANGE_UPLOAD_STATUS,
                payload: {
                    uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS
                }
            })
        ).toEqual({
            ...initialState,
            uploadStatus: UploadStatusEnum.UPLOAD_IN_PROGRESS
        })
    })

    it('should default to status UPLOAD_READY_TO_START if action payload is undefined', () => {
        expect(
            uploadReducer(initialState, {
                type: UploadActionType.CHANGE_UPLOAD_STATUS,
                payload: undefined
            })
        ).toEqual({
                ...initialState,
                uploadStatus: UploadStatusEnum.UPLOAD_READY_TO_START
        })
    })

})

/*Test action CHANGE_UPLOAD_PROGRESS_PERCENT*/
describe('test UploadActionType CHANGE_UPLOAD_PROGRESS_PERCENT', () => {
    it('should change progress % and progress file size on CHANGE_UPLOAD_PROGRESS_PERCENT action', () => {
        expect(
            uploadReducer(initialState, {
                type: UploadActionType.CHANGE_UPLOAD_PROGRESS_PERCENT,
                payload: {
                    uploadProgressPercent: 30,
                    uploadProgressSize: 23754,
                    
                }
            })
        ).toEqual({
                ...initialState,
                uploadProgressPercent: 30,
                uploadProgressSize: 23754,
                uploadTimeLeft:0
       })
    })

    it('should default progress percent and size to 0 if action payload is undefined', () => {
        expect(
            uploadReducer(initialState, {
                type: UploadActionType.CHANGE_UPLOAD_STATUS,
                payload: undefined
            })
        ).toEqual({
                ...initialState,
                uploadStatus: 0,
                uploadProgressSize: 0
        })
    })

})

/*Test action SET_FILES_TO_UPLOAD*/
describe('test UploadActionType SET_FILES_TO_UPLOAD', () => {
    it('should change filesToUpload, filesToUploadSize on CHANGE_UPLOAD_PROGRESS_PERCENT action', () => {
        const file1 = mockFile();
        const file2 = mockFile();
        const file3 = mockFile();
        const filesToUpload = [file1, file2, file3]
        expect(
            uploadReducer(initialState, {
                type: UploadActionType.SET_FILES_TO_UPLOAD,
                payload: {
                    filesToUpload
                }
            })
        ).toEqual({
            ...initialState,
            filesToUpload,
            filesToUploadSize: 1024*3
        })
    })

    it('should default filesToUpload to [] and filesToUploadSize to 0 if action payload is undefined', () => {
        expect(
            uploadReducer(initialState, {
                type: UploadActionType.SET_FILES_TO_UPLOAD,
                payload: undefined
            })
        ).toEqual({
            ...initialState,
            filesToUpload:[],
            filesToUploadSize: 0
        })
    })

})