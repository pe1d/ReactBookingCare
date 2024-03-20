import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
import HomeHeader from '../../containers/HomePage/HomeHeader';
import HomeFooter from '../../containers/HomePage/HomeFooter';
import * as actions from "../../store/actions"
import './doctorInfo.scss'
import { LANGUAGES } from '../../utils';
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHtml: '',
            description: '',
            positionData: '',
            firstName: '',
            lastName: '',
            avatar: ''
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.infoDoctor !== this.props.infoDoctor) {
            this.CheckMarkdown(this.props.infoDoctor)
        }
    }
    CheckMarkdown = (data) => {
        if (data.Markdown.contentHtml) {
            let imgBase64 = '';
            if (data.image) {
                imgBase64 = new Buffer(data.image, 'base64').toString('binary')
            }
            this.setState({
                description: data.Markdown.description,
                contentMarkdown: data.Markdown.contentMarkdown,
                contentHtml: data.Markdown.contentHtml,
                positionData: data.positionData,
                firstName: data.firstName,
                lastName: data.lastName,
                avatar: imgBase64,
            })
        }
    }
    componentDidMount() {
        this.props.fetchInfoDoctor(this.props.match.params.id)
    }
    render() {
        // console.log(this.props.infoDoctor);
        let doctorId = this.props.match.params.id;
        let { description, contentHtml, positionData, firstName, lastName } = this.state;
        const theObj = { __html: contentHtml };
        return (
            <>
                <HomeHeader />
                <div className='container-info-doctor'>
                    <div className='img-info-doctor'
                        style={{ backgroundImage: `url(${this.state.avatar})` }}>
                    </div>
                    <div className='des-info-doctor'>
                        <h2><strong>
                            {this.props.language == LANGUAGES.VI ?
                                positionData.valueVi + ', Bác sĩ ' + lastName + " " + firstName
                                :
                                positionData.valueEn + ', Doctor ' + firstName + " " + lastName
                            }

                        </strong></h2>
                        {description}
                        <div className='des-location'>
                            <i className="fas fa-map-marker-alt"> </i> {this.props.infoDoctor.address}
                        </div>
                    </div>

                </div>
                <div className='container-info-doctor color-background' >
                    <div className='info-doctor p-4' dangerouslySetInnerHTML={theObj}>
                    </div>
                </div>
                <HomeFooter />
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
        fetchInfoDoctor: (id) => (dispatch(actions.fetchInfoDoctor(id)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
