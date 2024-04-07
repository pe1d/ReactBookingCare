import actionTypes from './actionTypes';
import {
    getAllCodeApi, createUser, getAllUser, delUser, editUserApi,
    getTopDoctorHomeFromDB, getAllDoctorFromDB, createInfoDoctorFromDB,
    getInfoDoctorFromDB
} from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
//-----------------GENDER
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeApi('gender');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFail())
            }
        } catch (e) {
            dispatch(fetchGenderFail());
            console.log('fetchGenderStart error', e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})
// ---------------ROlE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeApi('role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFail())
            }
        } catch (e) {
            dispatch(fetchRoleFail());
            console.log('fetchRoleStart error', e)
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
})
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})
//----------------POSITION
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeApi('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFail())
            }
        } catch (e) {
            dispatch(fetchPositionFail());
            console.log('fetchPositionStart error', e)
        }
    }

}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
})
export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})
//----------------USER-REDUX
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createUser(data);
            if (res && res.errCode === 0) {
                toast.success('Create a new user success!')
                dispatch(createUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(createUserFail())
            }
        } catch (e) {
            dispatch(createUserFail());
            console.log('create user error', e)
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})
//---------------DELETE USER
export const deleteUser = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await delUser(user);
            if (res && res.errCode === 0) {
                toast.success('Delete user success!')
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error('Delete user error!')
                dispatch(deleteUserFail())
            }
        } catch (e) {
            dispatch(deleteUserFail());
            console.log('create user error', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})
//---------------Fetch user
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFail())
            }
        } catch (e) {
            dispatch(fetchAllUserFail());
            console.log('fetchAllUserStart error', e)
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    user: data,
})
export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL
})
//--------------EDIT USER
export const editUser = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserApi(user);
            if (res && res.errCode === 0) {
                toast.success('Update user success!')
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error('Update user error!')
                dispatch(editUserFail())
            }
        } catch (e) {
            dispatch(editUserFail());
            console.log('Update user error', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

//--------------TopDoctor
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeFromDB('')
            // console.log("Check res: ", res);
            if (res && res.errCode == 0) {
                dispatch(fetchTopDoctorSuccess(res.data))
            } else {
                dispatch(fetchTopDoctorFail())
            }
        } catch (e) {
            console.log("fetchTopDoctorFail: ", e);
            dispatch(fetchTopDoctorFail())
        }
    }
}
export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: data
})
export const fetchTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
})
//--------------All-Edit-Doctor
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorFromDB()
            // console.log("Check res: ", res);
            if (res && res.errCode == 0) {
                dispatch(fetchAllDoctorSuccess(res.data))
            } else {
                dispatch(fetchAllDoctorFail())
            }
        } catch (e) {
            console.log("fetchTopDoctorFail: ", e);
            dispatch(fetchAllDoctorFail())
        }
    }
}
export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_EDITDES_DOCTOR_SUCCESS,
    data: data
})
export const fetchAllDoctorFail = () => ({
    type: actionTypes.FETCH_EDITDES_DOCTOR_FAIL,
})
//--------------Save-info-doctor
export const saveInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createInfoDoctorFromDB(data)
            console.log("Check res: ", res);
            if (res && res.errCode == 0) {
                toast.success('Create info doctor success!')
                dispatch(saveInfoDoctorSuccess())
            } else {
                toast.error('Create info doctor fail.!')
                dispatch(saveInfoDoctorFail())
            }
        } catch (e) {
            toast.error('Create info doctor fail!')
            console.log("saveInfoDoctorFail: ", e);
            dispatch(saveInfoDoctorFail())
        }
    }
}
export const saveInfoDoctorSuccess = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
})
export const saveInfoDoctorFail = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_FAIL,
})
//-------------Get-info-doctor
export const fetchInfoDoctor = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getInfoDoctorFromDB(id)
            // console.log("Check res: ", res);
            if (res && res.errCode == 0) {
                dispatch(fetchInfoDoctorSuccess(res.data))
            } else {
                dispatch(fetchInfoDoctorFail())
            }
        } catch (e) {
            console.log("fetchTopDoctorFail: ", e);
            dispatch(fetchInfoDoctorFail())
        }
    }
}
export const fetchInfoDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_INFO_DOCTOR_SUCCESS,
    data: data
})
export const fetchInfoDoctorFail = () => ({
    type: actionTypes.FETCH_INFO_DOCTOR_FAIL,
})
//-----------
export const fetchAllCodeTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeApi('TIME')
            // console.log("Check res: ", res);
            if (res && res.errCode == 0) {
                dispatch(fetchAllCodeTimeSuccess(res.data))
            } else {
                dispatch(fetchAllCodeTimeFail())
            }
        } catch (e) {
            console.log("fetchAllCodeTimeFail: ", e);
            dispatch(fetchAllCodeTimeFail())
        }
    }
}
export const fetchAllCodeTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_TIME_HOUR_SUCCESS,
    data: data
})
export const fetchAllCodeTimeFail = () => ({
    type: actionTypes.FETCH_ALLCODE_TIME_HOUR_FAIL,
})