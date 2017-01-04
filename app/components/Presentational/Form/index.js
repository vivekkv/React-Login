import React from 'react'

export default class Form extends React.Component {

    render() {
        return <Form>{this.props.children}</Form>
    }
}

Form.prototype = {
    className : React.PropTypes.array
}