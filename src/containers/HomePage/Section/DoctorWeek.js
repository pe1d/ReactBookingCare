import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
class DoctorWeek extends Component {

    render() {

        return (
            <>
                <div className='section-share section-doctor-week'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                            <button className='btn-section'>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-custom'>
                                    <div className='custom-border'>
                                        <div className='outer-bg'>
                                            <div className='bg-image section-doctor-week'></div>
                                        </div>
                                        <div className='title-img text-center'>
                                            <div>Giáo sư, tiến sĩ</div>
                                            <div>Cơ xương khớp 1</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-custom'>
                                    <div className='custom-border'>
                                        <div className='outer-bg'>
                                            <div className='bg-image section-doctor-week'></div>
                                        </div>
                                        <div className='title-img text-center'>
                                            <div>Giáo sư, tiến sĩ</div>
                                            <div>Cơ xương khớp 2</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-custom'>
                                    <div className='custom-border'>
                                        <div className='outer-bg'>
                                            <div className='bg-image section-doctor-week'></div>
                                        </div>
                                        <div className='title-img text-center'>
                                            <div>Giáo sư, tiến sĩ</div>
                                            <div>Cơ xương khớp 3</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-custom'>
                                    <div className='custom-border'>
                                        <div className='outer-bg'>
                                            <div className='bg-image section-doctor-week'></div>
                                        </div>
                                        <div className='title-img text-center'>
                                            <div>Giáo sư, tiến sĩ</div>
                                            <div>Cơ xương khớp 4</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-custom'>
                                    <div className='custom-border'>
                                        <div className='outer-bg'>
                                            <div className='bg-image section-doctor-week'></div>
                                        </div>
                                        <div className='title-img text-center'>
                                            <div>Giáo sư, tiến sĩ</div>
                                            <div>Cơ xương khớp 5</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-custom'>
                                    <div className='custom-border'>
                                        <div className='outer-bg'>
                                            <div className='bg-image section-doctor-week'></div>
                                        </div>
                                        <div className='title-img text-center'>
                                            <div>Giáo sư, tiến sĩ</div>
                                            <div>Cơ xương khớp 6</div>
                                        </div>
                                    </div>
                                </div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorWeek);
