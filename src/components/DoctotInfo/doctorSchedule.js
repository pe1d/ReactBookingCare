import React, { Component } from 'react';
import { connect } from 'react-redux';
import './doctorSchedule.scss'
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../utils';
import { getSchedule } from '../../services/userService'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            selectDay: moment(new Date()).startOf('day').valueOf(),
            allAvalableTime: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.SetSchedule();
        }
        if (this.props.infoDoctor.id !== prevProps.infoDoctor.id) {
            this.SetScheduleTime();
        }
    }
    SetSchedule = async () => {
        let arrDays = [];
        for (let i = 0; i < 5; i++) {
            let obj = {}
            if (this.props.language == LANGUAGES.VI) {
                obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            } else {
                obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDays.push(obj)
        }
        // console.log(this.state.selectDay);
        this.setState({
            allDays: arrDays
        })
    }
    componentDidMount() {
        // this.props.fetchInfoDoctor(this.props.match.params.id)
        // let { language } = this.props;
        // console.log('moment vi: ', moment(new Date()).format('dddd - DD/MM'));
        // console.log('moment en: ', moment(new Date()).locale('en').format('dddd - DD/MM'));
        this.SetSchedule()
    }
    handleChange = async (event) => {
        // let id = this.props.match.params.id
        this.setState({
            selectDay: event.target.value,
        }, () => this.SetScheduleTime())
    }
    SetScheduleTime = async () => {
        let date = this.state.selectDay
        // console.log(date);
        // let formatted_date = this.formatTimestamp(date)
        // console.log(formatted_date);
        let res = await getSchedule(this.props.infoDoctor.id, date)
        if (res && res.errCode == 0) {
            let data = res.data;
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
        console.log(res);
    }
    formatTimestamp = (timestamp) => {
        // Create a JavaScript Date object from the timestamp
        const date = new Date(+timestamp);
        console.log(date);
        // Extract and format the desired components
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
        const day = String(date.getDate()).padStart(2, '0');
        const hours = '00'; // Set hours to 00
        const minutes = '00'; // Set minutes to 00
        const seconds = '00'; // Set seconds to 00

        // Format the date string (US format)
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        console.log('Check: ', formattedDate);
        return formattedDate;
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        let { allDays, allAvalableTime } = this.state;
        let { language } = this.props
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select className="form-control col-3" onChange={(event) => this.handleChange(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    let day = this.capitalizeFirstLetter(item.label)
                                    return (
                                        <option value={item.value} key={index}>{day}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-time-schedule'>
                        <div className='text-calender'>
                            <span><i class="fa fa-calendar"> Lịch khám</i></span>
                        </div>
                        <div className='time-schedule-content'>
                            {allAvalableTime && allAvalableTime.length > 0 ?
                                allAvalableTime.map((item, index) => {
                                    let timeDisplay = language == LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    return (
                                        <button key={index} className="btn btn-warning">{timeDisplay}</button>
                                    )
                                })

                                :
                                <div>Không có lịch hẹn trong thời gian này. Vui lòng chọn ngày khác!</div>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        infoDoctor: state.admin.infoDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchInfoDoctor: (id) => (dispatch(actions.fetchInfoDoctor(id)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
