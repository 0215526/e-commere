import { takeLatest, put, all, call } from 'redux-saga/effects';
import { auth, createUserProfileDocument, gogleProvider, getCurrentUser } from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from './user.actions';
import UserActionTypes from './user.types';

export function* getSnapShopFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        if(!userAuth) return;

        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } 
    catch(error) {
        yield put(signInFailure(error));
    }
}

export function* signInAfterSignUp({payload: { user, additionalData}}) {
    yield getSnapShopFromUserAuth(user, additionalData)
}

export function* signUp({ payload: { email, password, displayName }}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: { displayName }}));
    }
    catch(error) {
        yield put(signUpFailure(error))
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    } 
    catch(error) {
        yield put(signOutFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(gogleProvider);
        yield getSnapShopFromUserAuth(user);
    } 
    catch(error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShopFromUserAuth(user);
    }
    catch(error) {
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        yield getSnapShopFromUserAuth(userAuth);
    }
    catch(error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOGGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignStart), 
        call(isUserAuthenticated), 
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}