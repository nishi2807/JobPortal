import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import './Login.css'
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData);
        console.log(userData);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="login-main-con">
                <div className='login-bg-con'></div>
                <div className="login-con">
                    <div className="login-blur-container">
                        <div className="login-title">
                                Login
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div id="login-subheading">
                                <label >Email</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                />
                                <span className="login-subheading">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <div id="login-subheading">
                                <label>Password</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password || errors.passwordincorrect
                                    })}
                                />
                                <span className="">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div className="login-bottom-btns">
                                <button type="submit" className="login-butn">
                                    Login
                                </button>
                                </div>

                                <div className="login-bottom-text">
                                <p>
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                            
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
