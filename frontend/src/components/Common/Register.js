import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import './Register.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            role: "",
            phone_number: NaN,
            skills: [],
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ role: event.target.value });
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    componentWillReceiveProps(nextProps) {
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
        console.log(this.state.skills);
        if (this.state.role === "applicant" && this.state.skills !== "" && this.state.skills.length !== 0)
            this.state.skills = this.state.skills.split(',');
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            role: this.state.role,
            phone_number: this.state.phone_number,
            skills: this.state.skills
        };
        this.props.registerUser(newUser, this.props.history);
        console.log(newUser);
    };
    render() {
        const { errors } = this.state;
        const userRole = this.state.role;
        let RoleForm;
        if (userRole === 'applicant') {
            RoleForm =
                <div>
                    <label htmlFor="skills">Skills (comma-separated):</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={this.state.skills}
                        placeholder="Enter skills"
                        id="skills"
                        type="text"
                    />
                </div>
        }
        else if (userRole === 'recruiter') {
            RoleForm =
                <div>
                    <label htmlFor="phone_number">Phone no.</label><br></br>
                    <input
                        onChange={this.onChange}
                        value={this.state.phone_number}
                        id="phone_number"
                        type="number"
                    />
                </div>
        }
        return (
            <div className="signup-main-con">
                <div className="signup-bg-con"></div>
                    <div className="signup-con">
                        <div className="signup-blur-container">
                            <div className="signup-title">
                                Register   
                            </div>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div id='signup-subheading'>Role<br></br>
                                
                                    <select
                                        value={this.state.role}
                                        onChange={this.handleChange}
                                        error={errors.role}
                                        id="role"
                                        className={classnames("signup-subheading",
                                         {
                                            invalid: errors.role
                                        })}
                                    >
                                        <div id="signup-subheading"></div>
                                        <option  value="">Select role</option>
                                        <option value="applicant">Applicant</option>
                                        <option value="recruiter">Recruiter</option>
                                        
                                    </select>
                                    <span className="signup-subheading">{errors.role}</span>
                                </div>
                                <div id="signup-subheading">Name<br></br>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        error={errors.name}
                                        id="name"
                                        type="text"
                                        className={classnames("signup-subheading", {
                                            invalid: errors.name
                                        })}
                                    />
                                    <span className="signup-subheading">{errors.name}</span>
                                </div>
                                <div id="signup-subheading">Email<br></br>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                        type="email"
                                        className={classnames("signup-subheading", {
                                            invalid: errors.email
                                        })}
                                    />
                                    <span className="signup-subheading">{errors.email}</span>
                                </div>
                                <div id="signup-subheading">Password<br></br>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                        className={classnames("", {
                                            invalid: errors.password
                                        })}
                                    />
                                    <span className="signup-subheading">{errors.password}</span>
                                </div>
                                <div id="signup-subheading">Confirm Password<br></br>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.password2}
                                        error={errors.password2}
                                        id="password2"
                                        type="password"
                                        className={classnames("", {
                                            invalid: errors.password2
                                        })}
                                    />
                                    <span className="signup-subheading">{errors.password2}</span>
                                </div>
                                <hr></hr>
                                <div className="signup-subheading">
                                    {RoleForm}
                                </div>
                                <div className='signup-bottom-con'>
                                    <button type="submit"className="signup-btn">
                                        Sign up
                                    </button>
                                    <div className="signup-bottom-text">
                                    <p >
                                    Already have an account? <Link to="/login">Log in</Link>
                                    </p>
                                    </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));