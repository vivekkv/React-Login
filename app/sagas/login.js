import { take } from 'redux-saga/effects'
import { SUBMIT_LOGIN } from '../constants/login'

export function* submitLogin() {
    var { formData } = yield take(SUBMIT_LOGIN);
    alert()
}