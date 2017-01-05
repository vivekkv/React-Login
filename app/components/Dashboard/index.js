import React from 'react'
import Auth from '../../auth'

export default class Dashboard extends React.Component {

    constructor() {
        super()
        Auth.deauthenticateUser();
    }

    render() {
        return <p>Dashboard</p>
    }
}