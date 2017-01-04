import React from 'react'
import { connect } from 'react-redux'

class App extends React.Component {
    render() {
        return (<p>App Rendered</p>)
    }
}

export default connect()(App)