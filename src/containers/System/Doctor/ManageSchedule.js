import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import { LANGUAGES, CRUDactions, CommonUtils, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import { saveSchedule, getSchedule } from '../../../services/userService'

class ManageShedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: null,
            arrDoctor: [],
            options: [
            ],
            actions: CRUDactions.READ,
            currentDate: new Date(),
            scheduleTime: [],
        }
    }
    handleChange = (selectedDoctor) => {
        // console.log(selectedDoctor);
        this.setState({
            selectedDoctor
        });

    }
    MergeData = (data) => {
        let data2 = [{ value: '', label: '' }];
        data.map((item, index) => {
            data2[index] = { value: item.id, label: item.lastName + " " + item.firstName };
        })
        return data2;
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllCodeTime();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                arrDoctor: this.props.doctors,
            }, () => {
                let list = this.MergeData(this.props.doctors);
                this.setState({
                    options: list,
                })
            })
        }
        if (prevProps.scheduleTime !== this.props.scheduleTime) {
            let data = this.props.scheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => {
                    item.isSelected = false
                    return item
                })
                // console.log("Check data", data);
            }
            this.setState({
                scheduleTime: data,
            })
        }
        // if (prevProps.infoDoctor !== this.props.infoDoctor) {
        //     this.CheckMarkdown(this.props.infoDoctor)
        // }
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
    handleOnchangeDatePicker = (data) => {
        try {
            if (data) {
                console.log(data);
                this.setState({
                    currentDate: data[0]
                })
            }
        } catch (e) {
            console.log(e);
        }
    }
    handleSelected = (data) => {
        // console.log("Check selected: ", data);
        let { scheduleTime } = this.state;
        // console.log(scheduleTime);
        scheduleTime = scheduleTime.map(item => {
            if (item.id === data.id) {
                item.isSelected = !item.isSelected;
            }
            return item
        })
        // console.log(scheduleTime);
        this.setState({
            scheduleTime
        })
    }
    handleSaveScheduleForDoctor = async () => {
        let { scheduleTime, selectedDoctor, currentDate } = this.state

        if (!currentDate || !selectedDoctor) {
            toast.error('Invalid')
            return;
        }
        let results = []
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let formatedDate = moment(currentDate).unix()
        let formatedDate = new Date(currentDate).getTime();
        if (scheduleTime && scheduleTime.length > 0) {
            let selectedTime = scheduleTime.filter(item => item.isSelected == true)
            // console.log("Check selected: ", selectedTime);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = formatedDate;
                    obj.timeType = item.keyMap;
                    results.push(obj)
                })

            } else {
                toast.error('Invalid')
                return
            }
        }
        let res = await saveSchedule({
            arrSchedule: results,
            doctorId: selectedDoctor.value,
            date: formatedDate
        })
        console.log('check respone', res);
    }
    render() {
        let { scheduleTime } = this.state
        let { language } = this.props
        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id="manage-schedule.title"></FormattedMessage>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-doctor"></FormattedMessage></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChange}
                                    options={this.state.options}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-date"></FormattedMessage></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className='col-12 form-group pick-hour'>
                                <label><FormattedMessage id="manage-schedule.choose-time"></FormattedMessage></label>
                                <div className=''>
                                    {scheduleTime && scheduleTime.length > 0 &&
                                        scheduleTime.map((item, index) => {
                                            return (
                                                <button
                                                    className={item.isSelected === false ? 'btn btn-light' : 'btn btn-warning'}
                                                    key={index}
                                                    onClick={() => this.handleSelected(item)}
                                                >
                                                    {language == LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='col-12'>
                                <button
                                    className='btn btn-primary'
                                    onClick={() => this.handleSaveScheduleForDoctor()}
                                >
                                    <FormattedMessage id="manage-schedule.save"></FormattedMessage>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.admin.arrUser,
        doctors: state.admin.allDoctors,
        infoDoctor: state.admin.infoDoctor,
        scheduleTime: state.admin.scheduleTime,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllCodeTime: () => dispatch(actions.fetchAllCodeTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageShedule);
