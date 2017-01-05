import React, { PropTypes } from 'react'
import Auth from '../../auth'
import Nav from '../Navigation/index.jsx'
import Content from '../Content/index.jsx'

export default class Dashboard extends React.Component {

    constructor() {
        super()
        this.logOff = this.logOff.bind(this)
    }

    render() {
        return (<div>
        <Nav logOff={this.logOff}/>
        <Content>
            <div className="jumbotron">
                <h1>Home Page   </h1>
            </div>
      </Content></div>)
    }

    logOff() {
        Auth.deauthenticateUser();
        this.context.router.replace("/")
    }
}

Dashboard.contextTypes = {
  router: PropTypes.object.isRequired
};