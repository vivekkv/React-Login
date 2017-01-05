import React from 'react'
import styles from './styles.css'

export default class Form extends React.Component {

    render() {
        const childrenWithProps = this.recursiveCloneChildren(this.props.children);
        return (<form onSubmit={this.props.onSubmit}>{childrenWithProps}
             <input type="submit" value="Login" className={styles.submit_btn} />
        </form>)
    }

    recursiveCloneChildren(children) {
        return React.Children.map(children, child => {
            var childProps = {};
            if (React.isValidElement(child) && child.props.name) {
                var childValue = this.props.formData[child.props.name]
                childProps = {
                    onChange: this.props.onChange,
                    value: childValue ? childValue.value : null
                };
            }
            if (child.props) {
                childProps.children = this.recursiveCloneChildren(child.props.children);
                return React.cloneElement(child, childProps);
            }
            return child;
        });
    }
}

Form.propTypes = {
    className : React.PropTypes.array,
    formData: React.PropTypes.object
}