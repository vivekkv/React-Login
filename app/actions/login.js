import { INPUT_CHANGED, SUBMIT_LOGIN } from '../constants/login'

export function inputChanged(name, value) {
    return {
        type: INPUT_CHANGED,
        name,
        value
    }
}

export function submitLogin(formData) {
    return {
        type: SUBMIT_LOGIN,
        formData
    }
}