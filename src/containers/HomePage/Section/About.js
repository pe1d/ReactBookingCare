import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
class About extends Component {

    render() {

        return (
            <>
                <div className='section-share section-about'>
                    <div className='section-about-header'>
                        Truyền thông nói gì về Booking Care
                    </div>
                    <div className='section-about-content'>
                        <div className='content-left'>
                            <iframe width="592px" height="332px"
                                src="https://www.youtube.com/embed/FyDQljKtWnI"
                                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                        </div>
                        <div className='content-right'>
                            <p>CÀ PHÊ KHỞI NGHIỆP VTV1
                                Chương trình được phát sóng lúc 6h55 ngày 14/11/2018 trên VTV1<br></br>
                                ------------------------------------------------------------------<br></br>
                                Hãy cùng đón xem:<br></br>
                                📺 Chương trình Quốc gia khởi nghiệp<br></br>
                                🎬 Phát sóng vào 20:10 tối thứ 6 hàng tuần<br></br>
                                📺 Chương trình Cà phê khởi nghiệp<br></br>
                                🎬 Phát sóng vào lúc 06:55 sáng thứ 2 đến thứ 6 hàng tuần trên kênh VTV1, Đài truyền hình Việt Nam<br></br>
                            </p>
                        </div>
                    </div>
                </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
