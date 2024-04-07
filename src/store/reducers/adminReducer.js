import actionTypes from '../actions/actionTypes';



const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    arrUser: [],
    topDoctors: [],
    allDoctors: [],
    infoDoctor: {},
    scheduleTime: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }

        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            return {
                ...state
            }
        //ROLE
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_FAIL:
            return {
                ...state
            }
        //POSITION
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_FAIL:
            return {
                ...state
            }
        // Get all user
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.arrUser = action.user;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USER_FAIL:
            return {
                ...state
            }
        //Top-Doctor
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            return {
                ...state
            }
        //All-Doctor
        case actionTypes.FETCH_EDITDES_DOCTOR_SUCCESS:
            state.allDoctors = action.data;
            // console.log(state.allDoctors);
            return {
                ...state
            }

        case actionTypes.FETCH_EDITDES_DOCTOR_FAIL:
            return {
                ...state
            }
        //Info-doctor
        case actionTypes.FETCH_INFO_DOCTOR_SUCCESS:

            state.infoDoctor = action.data;
            // console.log('Check data by me:', state.infoDoctor);
            return {
                ...state
            }
        case actionTypes.FETCH_INFO_DOCTOR_FAIL:
            return {
                ...state
            }
        //Code-Time
        case actionTypes.FETCH_ALLCODE_TIME_HOUR_SUCCESS:

            state.scheduleTime = action.data;
            // console.log('Check data by me:', state.infoDoctor);
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_TIME_HOUR_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;