import { uploadReducer, UploadState } from './upload-reducer/upload-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ //can add more reducers here
    uploadState: uploadReducer
});

export interface ApplicationState {
    uploadState: UploadState
}

export default rootReducer;