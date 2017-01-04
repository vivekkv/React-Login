import React from 'react'
import { connect } from 'react-redux'

class App extends React.Component {
    render() {
        return (<p>{this.props.children}</p>)
    }
}

export default connect()(App)