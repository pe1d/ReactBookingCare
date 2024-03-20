import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import DoctorWeek from './Section/DoctorWeek';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from '../../routes/Home';
import HomeBanner from './HomeBanner';
class HomePage extends Component {
    handleAfterChange = (event, slick, currentSlide) => {
        console.log('Check slide: ', currentSlide);
    }
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />
            // afterChange: this.handleAfterChange(),
        };
        return (
            <>
                <HomeHeader />
                <HomeBanner />
                <Specialty
                    settings={settings} />
                <MedicalFacility
                    settings={settings} />
                <DoctorWeek
                    settings={settings} />
                <HandBook
                    settings={settings} />
                <About />
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
