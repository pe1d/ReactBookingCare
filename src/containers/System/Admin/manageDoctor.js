import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './manageDoctor.scss'
import { LANGUAGES, CRUDactions, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];


const mdParser = new MarkdownIt(/* Markdown-it options */);
class manageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHtml: '',
            description: '',
            selectedDoctor: null,
            arrDoctor: [],
            options: [
                { value: 'chocolate', label: 'Choco' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
            ],
            actions: CRUDactions.READ,
        }
    }
    // Finish!
    MergeData = (data) => {
        let data2 = [{ value: '', label: '' }];
        data.map((item, index) => {
            data2[index] = { value: item.id, label: item.lastName + " " + item.firstName };
        })
        return data2;
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHtml: html,
        })
    }
    handleSaveContentMarkDown = () => {
        if (this.state.actions == CRUDactions.CREATE) {
            let check = this.CheckRequired()
            if (check == true) {
                this.props.saveInfoDoctor(this.state)
            }
        } else if (this.state.actions == CRUDactions.EDIT) {
            let check = this.CheckRequired()
            if (check == true) {
                this.props.saveInfoDoctor(this.state)
            }
        }
        if (this.state.actions == CRUDactions.READ) {
            alert('Vui long chon bac si')
        }
    }
    CheckRequired = () => {
        let arrCheck = ['description', 'contentMarkdown', 'contentHtml'];
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
    handleChange = (selectedDoctor) => {
        // console.log(selectedDoctor);
        this.setState({
            selectedDoctor
        }, () => {
            this.props.fetchInfoDoctor(selectedDoctor.value);
        });
    }
    CheckMarkdown = (data) => {
        if (!data.Markdown.contentHtml) {
            this.setState({
                actions: CRUDactions.CREATE,
                description: '',
                contentMarkdown: '',
                contentHtml: '',
            })
        } else {
            this.setState({
                actions: CRUDactions.EDIT,
                description: data.Markdown.description,
                contentMarkdown: data.Markdown.contentMarkdown,
                contentHtml: data.Markdown.contentHtml,
            }, () => {
                console.log('Check state: ', this.state.actions);
            })
        }
    }
    handleChangeDes = (event) => {
        this.setState({
            description: event.target.value
        })
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
        if (prevProps.infoDoctor !== this.props.infoDoctor) {
            this.CheckMarkdown(this.props.infoDoctor)
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
    }

    render() {
        return (
            <>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>Tạo thông tin doctor </div>
                    <div className='manage-doctor-info'>
                        <div className='content-right'>
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.options}
                            />
                        </div>
                        <div className='content-left from-group'>
                            <label>Thông tin giới thiệu</label>
                            <textarea className='form-control' rows={4}
                                value={this.state.description}
                                onChange={(event) => this.handleChangeDes(event)}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className='manage-doctor-editer'>
                        <MdEditor style={{ height: '500px' }} value={this.state.contentMarkdown} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                    </div>
                    <button className={this.state.actions === CRUDactions.EDIT ? "save-content btn btn-warning my-3" : "btn btn-primary my-3"}
                        onClick={() => this.handleSaveContentMarkDown()}
                    >
                        {this.state.actions === CRUDactions.EDIT ?
                            <FormattedMessage id='manage-user.edit' />
                            :
                            <FormattedMessage id='manage-user.save' />
                        }
                    </button>
                </div >
            </>
        )
    };
}


const mapStateToProps = state => {
    return {
        users: state.admin.arrUser,
        doctors: state.admin.allDoctors,
        infoDoctor: state.admin.infoDoctor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (userId) => dispatch(actions.deleteUser(userId)),
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),
        fetchInfoDoctor: (id) => dispatch(actions.fetchInfoDoctor(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(manageDoctor);
