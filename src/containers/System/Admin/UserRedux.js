import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUDactions, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableUsermanage from './TableUsermanage';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImageUrl: '',
            isOpen: false,
            fileName: '',
            //user
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            role: '',
            position: '',
            avatar: '',
            //
            isUserCreated: '',
            //
            actions: '',
            id: ''
        }
    }

    async componentDidMount() {
        this.props.fetchGenderStart();
        this.props.fetchPositionStart();
        this.props.fetchRoleStart();
        // try {
        //     let res = await getAllCodeApi('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.users !== this.props.users) {
            let arrRoles = this.props.roleRedux
            let arrGenders = this.props.genderRedux
            let arrPositions = this.props.positionRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                actions: CRUDactions.CREATE,
                fileName: '',
                previewImageUrl: '',
            })
        }
    }

    handleChangeImage = async (event) => {
        let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
        let data = event.target.files;
        let file = data[0];
        let objUrl = ''
        if (file === undefined) {
            return;
        }
        if (allowedExtension.indexOf(file.type) > -1) {
            let base64 = await CommonUtils.getBase64(file);
            console.log("check base 64", base64);
            objUrl = URL.createObjectURL(file)
            this.setState({
                previewImageUrl: objUrl,
                fileName: file.name,
                avatar: base64
            })
            event.target.file = '';
        } else {
            alert('Not a image')
            this.setState({
                previewImageUrl: '',
                fileName: ''
            })
        }
    }
    openPreviewImage = () => {
        if (this.state.previewImageUrl === '') {
            return
        }
        this.setState({
            isOpen: true,
        })
    }
    checkValidateInput = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phonenumber', 'address'];
        let isValid = true;
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        let check = this.checkValidateInput();
        if (check == false) {
            return;
        }
        let { actions } = this.state;
        if (actions == CRUDactions.CREATE) {
            this.props.createNewUser(this.state);
        }
        if (actions == CRUDactions.EDIT) {
            this.props.editUserRedux(this.state);
        }

    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    handleEditUserfromParent = (user) => {
        let imgBase64 = '';
        if (user.image) {
            imgBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        this.setState({
            email: user.email,
            password: 'PASSWWORD_HASHCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            position: user.positionId,
            gender: user.gender,
            role: user.roleId,
            avatar: imgBase64,
            actions: CRUDactions.EDIT,
            id: user.id,
            previewImageUrl: imgBase64
        })
    }
    handleCancel = () => {
        let arrRoles = this.props.roleRedux
        let arrGenders = this.props.genderRedux
        let arrPositions = this.props.positionRedux
        if (this.state.actions == CRUDactions.EDIT) {
            this.setState({
                actions: CRUDactions.CREATE,
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                previewImageUrl: '',
                fileName: ''
            }, () => {
                console.log(this.state);
            })

        }
        if (this.state.actions == CRUDactions.CREATE) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                previewImageUrl: '',
                fileName: ''
            })
        }
    }
    render() {
        let { genderArr, roleArr, positionArr, email, password, firstName, lastName,
            phonenumber, address, role, gender, position }
            = this.state;
        let { language, isLoadingGender } = this.props;
        return (
            <>
                <div className='user-redux-container'>
                    <div className='title'>User Redux with Peid</div>
                    <div className="user-redux-body" >
                        <div className='container'>
                            <div className='row'>
                                <div className='form-group col-md-12 my-3'>
                                    <FormattedMessage id='manage-user.add' />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <label for="inputEmail4"><FormattedMessage id='manage-user.email' /></label>
                                    <input
                                        value={email}
                                        onChange={(event) => this.onChangeInput(event, 'email')}
                                        type="email" className="form-control" id="inputEmail4" placeholder="Email"
                                        disabled={this.state.actions === CRUDactions.EDIT ? true : false} />
                                </div>
                                <div className="form-group col-md-3">
                                    <label for="inputPassword4"><FormattedMessage id='manage-user.password' /></label>
                                    <input type="password" className="form-control" id="inputPassword4" placeholder="Password"
                                        value={password}
                                        onChange={(event) => this.onChangeInput(event, 'password')}
                                        disabled={this.state.actions === CRUDactions.EDIT ? true : false} />
                                </div>
                                <div className="form-group col-md-3">
                                    <label for="inputEmail4"><FormattedMessage id='manage-user.first-name' /></label>
                                    <input type="text" className="form-control" id="inputEmail4" placeholder="First Name"
                                        value={firstName}
                                        onChange={(event) => this.onChangeInput(event, 'firstName')} />
                                </div>
                                <div className="form-group col-md-3">
                                    <label for="inputPassword4"><FormattedMessage id='manage-user.last-name' /></label>
                                    <input type="text" className="form-control" id="inputPassword4" placeholder="Last Name"
                                        value={lastName}
                                        onChange={(event) => this.onChangeInput(event, 'lastName')} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-md-9 ">
                                    <label for="inputAddress"><FormattedMessage id='manage-user.address' /></label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"
                                        value={address}
                                        onChange={(event) => this.onChangeInput(event, 'address')} />
                                </div>
                                <div className="form-group col-md-3">
                                    <label for="inputAddress2"><FormattedMessage id='manage-user.phonenumber' /></label>
                                    <input type="phonenumber" className="form-control" id="inputAddress2" placeholder="+84012931...."
                                        value={phonenumber}
                                        onChange={(event) => this.onChangeInput(event, 'phonenumber')} />
                                </div>
                            </div>
                            <div className='row'>
                                {isLoadingGender === true ?
                                    "loading gender" : ''
                                }
                            </div>
                            <div className="row ">
                                <div className="form-group col-md-3">
                                    <label for="inputState"><FormattedMessage id='manage-user.gender' /></label>
                                    <select className="form-control" onChange={(event) => this.onChangeInput(event, 'gender')}
                                        value={gender}>
                                        {genderArr && genderArr.length > 0 &&
                                            genderArr.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label for="inputState"><FormattedMessage id='manage-user.role' /></label>
                                    <select className="form-control" onChange={(event) => this.onChangeInput(event, 'role')}
                                        value={role}>
                                        {roleArr && roleArr.length > 0 &&
                                            roleArr.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label for="inputState"><FormattedMessage id='manage-user.position' /></label>
                                    <select className="form-control" onChange={(event) => this.onChangeInput(event, 'position')}
                                        value={position}>
                                        {positionArr && positionArr.length > 0 &&
                                            positionArr.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label for="inputState"><FormattedMessage id='manage-user.image' /></label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">Upload</span>
                                        </div>
                                        <div class="custom-file">
                                            <input type="file" id="inputGroupFile01" class="custom-file-input" aria-describedby="inputGroupFileAddon01"
                                                onChange={(event) => this.handleChangeImage(event)}
                                            />
                                            <label class="custom-file-label" htmlFor="inputGroupFile01">
                                                {this.state.previewImageUrl === '' ?
                                                    'Choose file'
                                                    :
                                                    this.state.fileName
                                                }
                                            </label>
                                        </div>
                                    </div>
                                    {this.state.previewImageUrl !== '' ?
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                        :
                                        ''
                                    }
                                </div>
                            </div>
                            <button className={this.state.actions === CRUDactions.EDIT ? "btn btn-warning my-3" : "btn btn-primary my-3"}
                                onClick={() => this.handleSaveUser()}>
                                {this.state.actions === CRUDactions.EDIT ?
                                    <FormattedMessage id='manage-user.edit' />
                                    :
                                    <FormattedMessage id='manage-user.save' />
                                }

                            </button>
                            <button className='btn btn-danger mx-3'
                                onClick={() => this.handleCancel()}
                            >
                                {this.state.actions === CRUDactions.EDIT ?
                                    <FormattedMessage id='manage-user.unedit' />
                                    :
                                    <FormattedMessage id='manage-user.unsave' />
                                }
                            </button>
                        </div>
                    </div >
                    <TableUsermanage
                        handleEditUserfromParent={this.handleEditUserfromParent}
                        actions={this.state.actions}
                    />
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImageUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }

                </div >
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.arrUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
