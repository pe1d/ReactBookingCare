import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            errMessage: ''
        }
    }
    handleOnChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        let { userName, password } = this.state;
        console.log('Username: ', userName, 'Password: ', password)
        try {
            let data = await handleLoginApi(userName, password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            } else {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }
    render() {

        return (
            <>
                <div className='login-background'>
                    <div className='login-container'>
                        <div className='login-content'>
                            <div>
                                <h1 style={{ textAlign: 'center' }}>Sign in</h1>
                            </div>
                            <form>
                                <div className="col-12 form-group login-input">
                                    <input value={this.state.userName} onChange={(event) => this.handleOnChangeInput(event)}
                                        name='userName'
                                        type="email" className="form-control" placeholder='Enter your email' />
                                    <label className="form-label">Email address</label>
                                </div>
                                <div className="col-12 form-group login-input">
                                    <input value={this.state.password} onChange={(event) => this.handleOnChangeInput(event)}
                                        name='password'
                                        type="password" className="form-control" placeholder='Enter your password' />
                                    <label className="form-label">Password</label>
                                </div>
                                <div className='col-12' style={{ color: 'red' }}>
                                    {this.state.errMessage}
                                </div>
                                <button type="button" className="btn btn-primary btn-signin"
                                    onClick={() => this.handleLogin()}
                                >Sign in</button>
                                <div className="col-12">
                                    <div className="col" style={{ margin: '5px', textAlign: 'center' }}>
                                        <a href="#!">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="text-center ">
                                    <p>Not a member? <a href="#!">Register</a></p>
                                    <p>or sign up with:</p>
                                    <div className='sign-other'>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-facebook-f"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-google"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-twitter"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fab fa-github"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div >
                </div >
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
