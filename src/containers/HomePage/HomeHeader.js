import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/logo.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        //fire redux event : actions
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language;
        console.log(language)
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='' src={logo}></img>
                            <div className='header-logo'>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.specialty' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.searchdoctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.health-facility' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.select-room' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.doctor' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.select-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.examination-package' /></b></div>
                                <div className='sub-title'><FormattedMessage id='homeheader.health-check' /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i> <FormattedMessage id='homeheader.support' />
                            </div>
                            <div className={language === LANGUAGES.VI ? 'lang-vi active' : 'lang-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'lang-en active' : 'lang-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title-1'>
                            <FormattedMessage id='home-banner.medical-foundation' />
                        </div>
                        <div className='title-2'>
                            <b><FormattedMessage id='home-banner.health-care' /></b>
                        </div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder="Tìm kiếm bác sĩ" />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon-child '><i className="far fa-hospital"></i></div>
                                <div className='text-child'><FormattedMessage id='home-banner.specialty-exam' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child '><i className="fas fa-mobile-alt"></i></div>
                                <div className='text-child'><FormattedMessage id='home-banner.remote-exam' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child '><i className="fas fa-procedures"></i></div>
                                <div className='text-child'><FormattedMessage id='home-banner.genaral-exam' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child '><i className="fas fa-stethoscope"></i></div>
                                <div className='text-child'><FormattedMessage id='home-banner.medical-test' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child '><i className="fas fa-user-md"></i></div>
                                <div className='text-child'><FormattedMessage id='home-banner.mental-health' /></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child '><i className="fas fa-syringe"></i></div>
                                <div className='text-child'><FormattedMessage id='home-banner.dental-exam' /></div>
                            </div>
                        </div>
                    </div>
                </div >
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
