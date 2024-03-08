import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableUsermanage.scss'
import * as actions from '../../../store/actions'




class TableUsermanage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }
    async componentDidMount() {
        await this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                userRedux: this.props.users,
            })
        }
    }
    handleDeleteUser = (data) => {
        this.props.deleteUser(data)
    }
    handleEditUser = (user) => {
        this.props.handleEditUserfromParent(user)
    }
    render() {
        let { userRedux } = this.state;
        return (
            <>
                <div className='container'>
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
                            {userRedux && userRedux.length > 0 &&
                                userRedux.map((item, index) => {
                                    return (
                                        <tr key={index}>
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
                                                <button type="button" className="btn btn-primary mx-1 "
                                                    onClick={() => this.handleEditUser(item)}
                                                >Update</button>
                                                <button type="button" className="btn btn-danger mx-1 s"
                                                    onClick={() => this.handleDeleteUser(item)}
                                                >Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div >
            </>
        )
    };
}


const mapStateToProps = state => {
    return {
        users: state.admin.arrUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (userId) => dispatch(actions.deleteUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUsermanage);
