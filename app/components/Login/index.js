import React,  { PropTypes  } from 'react'
import Auth from '../../auth'
import Textbox from '../Presentational/Textbox'
import Form from '../Presentational/Form/index.jsx'
import { connect } from 'react-redux'
import { inputChanged, submitLogin } from '../../actions/login'
import { selectLogin } from '../../selectors/login'
import styles from './styles.css'

class Login extends React.Component {
 
    constructor(props, context) {
        super(props, context)
        this.processLogin = this.processLogin.bind(this)
    }

    render() {
        return (<div className="container">
            <div className={styles.card}>
            <h2 className={styles.login_title}>Login</h2>
                <hr />
                <Form onSubmit={this.processLogin} formData={this.props.formData} onChange={this.props.onChange}>
                    <Textbox name={"email"}  label={"Email"} type={"text"} autoFocus={true}/>
                    <Textbox name={"password"}  label={"Password"} type={"password"}/>
                </Form>
            </div>
        </div>)
    }

    processLogin(e) {
        e.preventDefault()
        this.props.dispatch(submitLogin(this.props.formData, (route) => {
            this.context.router.replace(route)
        }))
    }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        formData: selectLogin(state)
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onChange: function(name, value) {
            dispatch(inputChanged(name, value))   
        },
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);