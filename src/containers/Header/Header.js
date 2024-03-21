import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES, User_Role } from '../../utils'
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    changeLanguage = (language) => {
        //fire redux event : actions
        this.props.changeLanguageAppRedux(language)
    }
    componentDidMount() {
        console.log(this.props.userInfo);
        let { userInfo } = this.props;
        let menuApp = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = this.props.userInfo.roleId;
            if (role === User_Role.ADMIN) {
                menuApp = adminMenu;
            }
            if (role === User_Role.DOCTOR) {
                menuApp = doctorMenu;
            }
        }
        this.setState({
            menuApp: menuApp
        })
    }
    render() {
        const { processLogout, userInfo, language } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='languages'>
                    <div className='welcome'>{<FormattedMessage id="homeheader.welcome" />}, <></>
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''} !
                    </div>
                    <div className={language === LANGUAGES.VI ? 'lang-vi active' : 'lang-vi'}>
                        <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span>
                    </div>
                    <div className={language === LANGUAGES.EN ? 'lang-en active' : 'lang-en'}>
                        <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout} title='logout'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
