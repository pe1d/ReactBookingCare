import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }
    componentDidMount() {
        let { currentUser } = this.props;
        console.log(currentUser);
        if (currentUser && !_.isEmpty(currentUser)) {
            this.setState({
                id: currentUser.id,
                email: currentUser.email,
                password: 'hardcode',
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                address: currentUser.address,
            })
        }
    }
    toggle = () => {
        this.props.toggleUserModal();
    }
    handleOnChangeInput = (event) => {
        let copyState = { ...this.state };
        copyState[event.target.name] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateUser = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateUser();
        if (isValid === true) {
            //call api edit
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className='abc'
                size='lg'
                centered>
                <ModalHeader toggle={() => this.toggle()}>Edit your user</ModalHeader>
                <ModalBody>
                    <div className='Modal-container'>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label for="inputEmail4">Email</label>
                                    <input value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event)}
                                        type="email" className="form-control" name="email" placeholder="Email"
                                        disabled />
                                </div>
                                <div className="form-group col-6">
                                    <label for="inputPassword4">Password</label>
                                    <input value={this.state.password}
                                        onChange={(event) => this.handleOnChangeInput(event)}
                                        type="password" className="form-control" name="password" placeholder="Password"
                                        disabled />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="inputEmail4">First Name</label>
                                    <input value={this.state.firstName}
                                        onChange={(event) => this.handleOnChangeInput(event)}
                                        type="text" className="form-control" name="firstName" placeholder="First Name" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="inputPassword4">Last Name</label>
                                    <input value={this.state.lastName}
                                        onChange={(event) => this.handleOnChangeInput(event)}
                                        type="text" className="form-control" name="lastName" placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-12">
                                    <label for="inputAddress">Address</label>
                                    <input value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event)}
                                        type="text" className="form-control" name="address" placeholder="Address" />
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary px-3" onClick={() => this.handleSaveUser()}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary px-3" onClick={() => this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




