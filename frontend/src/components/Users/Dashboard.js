import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import './Dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            userdetails: [], 
        };
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount() {
        const { user } = this.props.auth;
        axios.get('http://localhost:4000/user/'+ user.id)
             .then(response => {
                 this.setState({userdetails: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        const { user } = this.props.auth;
        let UserOptions;
        if(this.state.userdetails.role === "applicant")
        {
            UserOptions = 
            <ul>
                <li><a href="/profile">My Profile</a></li>
                <li><a href="/jobsList">View Jobs</a></li>
                <li><a href="/myApplications">My Applications</a></li>
            </ul>
        }
        else if(this.state.userdetails.role === "recruiter")
        {
            UserOptions = 
            <ul>
                
                <li><a href="/profile">My Profile</a></li>
                <li><a href="/addJob">Add Job</a></li>
                <li><a href="/viewMyActiveJobs">My Job Listings</a></li>
                <li><a href="/employees">Employees</a></li>
                
            </ul>
        }
        return (
            <div className="ms-con">
                <div className="ms-blur-con">
                    <div className="ms-welcome">
                        <div className="ms-display-name">
                                    {user.name.split(" ")[0]} 
                            </div>
                            <Card.Body>
                                <Card.Title>
                                    <p className="main-subheading">
                                    You are logged into {" "}
                                    <span><b>JobsPlanet</b></span>
                                    </p>
                                </Card.Title>
                                <Card.Text>
                                    
                                    {UserOptions}
                                    
                                </Card.Text>
                            </Card.Body>
                        
                        
                        <br></br>
                        <button
                            onClick={this.onLogoutClick}
                            className="login-btn"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
