import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUser, createUser, delUser, editUserApi } from "../../services/userService"
import Modaluser from './Modaluser';
import { emitter } from '../../utils/emitter'
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {

            }
        }
    }
    async componentDidMount() {
        await this.getAllUserFromReact();
    }
    getAllUserFromReact = async () => {
        let response = await getAllUser('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            })
        }
    }
    handleOnClickUpdate = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    handleOnClickDel = async (data) => {
        try {
            let response = await delUser(data);
            console.log(response)
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(response.message)
            }
        } catch (e) {
            return e;
        }
    }
    handlOnClickCreate = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createUser(data)
            if (response && response.errCode !== 0) {
                alert(response.message)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'yourid' })
            }

        } catch (e) {
            console.log(e)
        }
    }
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }
    editUser = async (user) => {
        try {
            console.log('click save user:', user)
            let response = await editUserApi(user)
            if (response && response.errCode !== 0) {
                alert(response.message)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalEditUser: false,
                })
            }
        } catch (e) {
            return e;
        }
    }
    render() {
        let { arrUsers } = this.state;
        return (
            <>
                <div className='p-5'>
                    <Modaluser
                        isOpen={this.state.isOpenModalUser}
                        toggleUserModal={this.toggleUserModal}
                        createNewUser={this.createNewUser}
                    />
                    {this.state.isOpenModalEditUser &&
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEditUser}
                            toggleUserModal={this.toggleUserEditModal}
                            currentUser={this.state.userEdit}
                            editUser={this.editUser}
                        />
                    }
                    <div style={{ textAlign: 'center' }}>
                        <h2>Users table</h2>
                    </div>
                    <div>
                        <button className='mx-1 btn btn-primary w-10 px-5'
                            onClick={() => this.handlOnClickCreate()}>
                            <i class="fas fa-plus"></i> Create new
                        </button>
                    </div>
                    <table className="table table-striped w-100">
                        <thead>
                            <tr>
                                <th scope="col-">#</th>
                                <th scope="col-sm">Email</th>
                                <th scope="col-sm">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {item.email}
                                        </td>
                                        <td>
                                            {item.firstName}
                                        </td>
                                        <td>
                                            {item.lastName}
                                        </td>
                                        <td>
                                            {item.address}
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-primary mx-1 w-25" onClick={() => this.handleOnClickUpdate(item)}>Update</button>
                                            <button type="button" class="btn btn-danger mx-1 w-25" onClick={() => this.handleOnClickDel(item)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div >
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
