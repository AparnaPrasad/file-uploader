import { Action, Reducer, Dispatch } from "redux";

export enum UploadStatusEnum {
    UPLOAD_READY_TO_START,
    UPLOAD_IN_PROGRESS,
    UPLOAD_ERROR,
    UPLOAD_CANCELLED,
    UPLOAD_DONE
}

export interface UploadState {
    uploadStatus: UploadStatusEnum,
    uploadProgressPercent: number,
    filesToUpload: File[]
}

export const initialState: UploadState = {
    uploadStatus: UploadStatusEnum.UPLOAD_READY_TO_START,
    uploadProgressPercent: 0,
    filesToUpload: []
};


export interface DispatchAction extends Action<UploadActionType> {
    payload?: Partial<UploadState>
}

export enum UploadActionType {
    CHANGE_UPLOAD_STATUS = 'CHANGE_UPLOAD_STATUS',
    CHANGE_UPLOAD_PROGRESS_PERCENT = 'CHANGE_UPLOAD_PROGRESS_PERCENT',
    SET_FILES_TO_UPLOAD = 'SET_FILES_TO_UPLOAD'
}

export const uploadReducer: Reducer<UploadState, DispatchAction> = (state = initialState, action) => {

    switch (action.type) {
        case UploadActionType.CHANGE_UPLOAD_STATUS:
            return {
                ...state,
                uploadStatus: action.payload?.uploadStatus || UploadStatusEnum.UPLOAD_READY_TO_START
            }
        case UploadActionType.CHANGE_UPLOAD_PROGRESS_PERCENT:
            return {
                ...state,
                uploadProgressPercent: action.payload?.uploadProgressPercent||0
            }
        case UploadActionType.SET_FILES_TO_UPLOAD:
            return {
                ...state,
                filesToUpload: action.payload?.filesToUpload || []
            }

        default:
            return state;
    }
};

export class UploadActionDispatcher {

    private readonly dispatch: Dispatch<DispatchAction>;

    constructor(dispatch: Dispatch<DispatchAction>) {
        this.dispatch = dispatch;
    }
    changeUploadStatus = (uploadStatus?: UploadStatusEnum) => this.dispatch({ type: UploadActionType.CHANGE_UPLOAD_STATUS, payload: { uploadStatus } });
    changeUploadProgressPercent = (uploadProgressPercent?: number) => this.dispatch({ type: UploadActionType.CHANGE_UPLOAD_PROGRESS_PERCENT, payload: { uploadProgressPercent } });
    setFilesToUpload = (filesToUpload: File[]) => this.dispatch({ type: UploadActionType.SET_FILES_TO_UPLOAD, payload: { filesToUpload} })
}