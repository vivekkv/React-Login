import { take, call } from 'redux-saga/effects'
import { SUBMIT_LOGIN } from '../constants/login'
import { request } from '../utils'
import Auth from '../auth'

export function* submitLogin() {
    while(true) {
        var { formData, openRoute } = yield take(SUBMIT_LOGIN);
        try {
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
                alert("show error")
            } else {
                Auth.authenticateUser(response.data.token)
                openRoute("/")
            }
        }
        catch(e) {

        }
    }
}