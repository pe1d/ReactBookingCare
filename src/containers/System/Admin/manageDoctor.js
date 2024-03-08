import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './manageDoctor.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


const mdParser = new MarkdownIt(/* Markdown-it options */);
class manageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: ' ',
            contentHtml: '',
            description: '',
            selectedDoctor: null,
        }
    }
    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHtml: html,
        })
    }
    handleSaveContentMarkDown = () => {
        console.log("check state by me: ", this.state)
    }
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }
        );
    };
    handleChangeDes = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    async componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

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
                                options={options}
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
                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />

                    </div>
                    <button className='save-content btn btn-primary m-1'
                        onClick={() => this.handleSaveContentMarkDown()}
                    >
                        Lưu thông tin
                    </button>
                </div >
            </>
        )
    };
}


const mapStateToProps = state => {
    return {
        users: state.admin.arrUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (userId) => dispatch(actions.deleteUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(manageDoctor);
