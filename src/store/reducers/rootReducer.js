import authReducer from './authReducer';
import postReducer from './postReducer';
import ReducerVerse from './reducers_verses';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    verses: ReducerVerse,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;