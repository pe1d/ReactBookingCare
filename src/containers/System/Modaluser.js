import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
class Modaluser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '1',
            roleId: 'R1',
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                gender: '1',
                roleId: 'R1',
            })
        })
    }
    componentDidMount() {
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
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber', 'gender', 'roleId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser = () => {
        let isValid = this.checkValidateUser();
        if (isValid === true) {
            //call api create 
            this.props.createNewUser(this.state);
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
                <ModalHeader toggle={() => this.toggle()}>Create new user</ModalHeader>
                <ModalBody>
                    <div className='Modal-container'>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label for="inputEmail4">Email</label>
                                    <input value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event)}
                                        type="email" className="form-control" name="email" placeholder="Email" />
                                </div>
                                <div className="form-group col-6">
                                    <label for="inputPassword4">Password</label>
                                    <input value={this.state.password}
                                        onChange={(event) => this.handleOnChangeInput(event)}
                                        type="password" className="form-control" name="password" placeholder="Password" />
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
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label for="inputCity">Phone number</label>
                                    <input value={this.state.phonenumber}
                                        onChange={(event) => this.handleOnChangeInput(event)}
                                        type="text" className="form-control" name="phonenumber" />
                                </div>
                                <div className="form-group col-3">
                                    <label for="inputState">Gender</label>
                                    <select
                                        value={this.state.roleId}
                                        onChange={(event) => this.handleOnChangeInput(event)}
                                        name="gender" className="form-control">
                                        <option value="1">Male</option>
                                        <option value="0">Female</option>
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label for="inputZip">Role</label>
                                    <select
                                        value={this.state.gender}
                                        onChange={(event) => this.handleOnChangeInput(event)}
                                        name="roleId" className="form-control">
                                        <option value="R1">Admin</option>
                                        <option value="R2">Doctor</option>
                                        <option value="R3">Patient</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary px-3" onClick={() => this.handleAddNewUser()}>
                        Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(Modaluser);




