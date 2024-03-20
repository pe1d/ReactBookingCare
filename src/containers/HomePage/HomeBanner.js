import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/logo.svg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions';
class HomeBanner extends Component {

    changeLanguage = (language) => {
        //fire redux event : actions
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language;
        return (
            <>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);