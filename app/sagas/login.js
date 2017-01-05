import { take, call } from 'redux-saga/effects'
import { SUBMIT_LOGIN } from '../constants/login'
import { request } from '../utils'
import Auth from '../auth'

export function* submitLogin() {
    while(true) {
        var { formData, openRoute } = yield take(SUBMIT_LOGIN);
        try {
            if(validateFormData(formData)) {
                var response = yield call(request, '/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        "email": formData.email.value,
                        "password": formData.password.value
                    }),
                    headers: {
                            'Content-Type': 'application/json'
                        }
                });
                if(response.err) {
                    alert("login failed")
                } else {
                    Auth.authenticateUser(response.data.token)
                    openRoute("/")
                }
            }
        }
        catch(e) {
            console.log(e)
        }
    }
}

function validateFormData(formData) {
    if(!formData.email && !formData.password) {
        alert("email and password cannot be blank")
        return false;
    } else if(!formData.email || (formData.email && !formData.email.value)) {
        alert("email cannot be blank")
        return false;
    } else if(!formData.password || (formData.password && !formData.password.value)) {
        alert("password cannot be blank")
        return false;
    }
    return true;
}