import React from 'react'
import Form from '../Presentational/Form'
import { authenticateUser } from '../../auth'

export default class Login extends React.Component {
 
    constructor(props, context) {

        super(props, context)
        const storedMessage = localStorage.getItem('successMessage')
        let successMessage = ''

        if (storedMessage) {
            successMessage = storedMessage
            localStorage.removeItem('successMessage')
        }
        
        this.state = {
            errors: {},
            successMessage,
            user: {
                email: '',
                password: ''
            }
        }
        this.processLogin = this.processLogin.bind(this)
    }

    render() {
        return (<form onSubmit={this.processLogin}>
            <input type="text" placeholder="enter email"/> 
            <input type="text" placeholder="enter password"/> 
            <input type="submit" />
        </form>)
    }

    processLogin(e) {

        e.preventDefault()
        const email = encodeURIComponent(this.state.user.email)
        const password = encodeURIComponent(this.state.user.password)
        const formData = `email=${email}&password=${password}`
        const xhr = new XMLHttpRequest();

        xhr.open('post', '/auth/login')
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.responseType = 'json'
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    errors: {}
                });
                Auth.authenticateUser(xhr.response.token)
                this.context.router.replace('/')
            } else {
                    const errors = xhr.response.errors ? xhr.response.errors : {}
                    errors.summary = xhr.response.message
                    this.setState({
                        errors
                    });
                }
        })
        xhr.send(formData)
    }
}