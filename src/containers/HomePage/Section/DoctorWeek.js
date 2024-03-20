import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from "../../../store/actions"
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { Redirect, withRouter } from 'react-router';

class DoctorWeek extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('check', this.props.topDoctor)
        if (prevProps.topDoctor !== this.props.topDoctor) {
            this.setState({
                arrDoctor: this.props.topDoctor,
            }, () => {
                console.log('check state:', this.state);
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctor();
    }
    handleClickInfoDoctor = (doctorInfo) => {
        // return <Redirect to={`/home/doctor-info/${doctorInfo.id}`}></Redirect>
        this.props.history.push(`/home/doctor-info/${doctorInfo.id}`)
        // alert("Check " + doctorInfo.id)
    }
    render() {
        let arrDoctor = this.state.arrDoctor
        let lang = this.props.lang
        console.log('check data: ', this.state);
        console.log(this.props.topDoctor);
        return (
            <>
                <div className='section-share section-doctor-week'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="home-page.doctor-week" /></span>
                            <button className='btn-section'><FormattedMessage id="home-page.more" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {arrDoctor && arrDoctor.length > 0 &&
                                    arrDoctor.map((item, index) => {
                                        let imgBase64 = '';
                                        if (item.image) {
                                            imgBase64 = new Buffer(item.image, 'base64').toString('binary')
                                        }
                                        return (
                                            <div className='section-custom' key={index}>
                                                <div className='custom-border' >
                                                    <div className='outer-bg'>
                                                        <div className='bg-image section-doctor-week'
                                                            style={{ backgroundImage: `url(${imgBase64})` }}
                                                        >
                                                        </div>
                                                    </div>
                                                    <div className='title-img text-center' onClick={() => this.handleClickInfoDoctor(item)}>
                                                        <div>
                                                            {lang && lang == LANGUAGES.VI ? item.positionData.valueVi : item.positionData.valueEn}, {item.firstName} {item.lastName}
                                                        </div>
                                                        <div>Cơ xương khớp 1</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div >
                </div >
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctor: state.admin.topDoctors,
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorWeek));
