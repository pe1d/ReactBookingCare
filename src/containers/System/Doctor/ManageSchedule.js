import React, { Component } from 'react';
import { connect } from "react-redux";
class ManageShedule extends Component {
    render() {
        return (
            <>
                <div>
                    manage schedule
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageShedule);
