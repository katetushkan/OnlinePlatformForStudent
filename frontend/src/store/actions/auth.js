import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = token =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
};

export const authFail = error => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};
export const logout = () =>  {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    axios.post('http://0.0.0.0:8000/auth/logout/').then(res => {
        console.log(res.data);
    })
    return{
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout);
        }, expirationTime * 1000)
    }
}



export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://0.0.0.0:8000/auth/login/', {
            username: username,
            password: password
        }).then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
            window.location.href = '/'
        }).catch(err => {
            dispatch(authFail(err))
        })
    }

}

export const authSignUp = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://0.0.0.0:8000/auth/sign_up/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }).then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
            window.location.href = '/'
        }).catch(err => {
            if(err.response.data.username){
                alert(err.response.data.username);
            }
            if(err.response.data.email){
                alert(err.response.data.email);
            }
            if(err.response.data.password1){
                alert(err.response.data.password1);
            }
            if(err.response.data.password2){
                alert(err.response.data.password2);
            }
            console.log(err.response.data);
            debugger;
            dispatch(authFail(err))
        })
    }

};

export const authCheckState = () =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined){
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}




