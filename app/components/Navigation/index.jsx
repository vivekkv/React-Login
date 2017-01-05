import React from 'react'

export default class Navigation extends React.Component {

    constructor() {
        super()
        this.logOff = this.logOff.bind(this)
    }

    render() {
        return (
                <nav className="navbar navbar-default navbar-static-top" role="navigation">
                    <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="#">DASHBOARD</a>
                            </div>
                             <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="#" onClick={this.logOff}>Log off <span className="caret"></span></a>
                                </li>
                            </ul>
                    </div>
                </nav>)
    }

    logOff() {
        this.props.logOff()        
    }
}

Navigation.propTypes = {
    logOff: React.PropTypes.func
}