import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
class HomeFooter extends Component {

    render() {

        return (
            <>
                <div className='home-footer'>
                    <p>&copy; 2023 Peid. More information, please visit my github.
                        <a target='blank' href='https://github.com/pe1d'> &#8594; Click here &#8592;</a>
                    </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
