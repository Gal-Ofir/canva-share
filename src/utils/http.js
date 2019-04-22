import axios from "axios";
import socketIOClient from "socket.io-client";

const ID_KEY = `_id:${window.location.host}`;
export let socket;

export const initSocket = () => {
    console.log(document.location.origin);
    socket = socketIOClient(document.location.origin);
};

export const addShape = (data) => {
    data = {...data, ip: window.localStorage.getItem(ID_KEY)};
    socket.emit('update_board', data);
    console.log(data.board_id);
    socket.emit(
        data.board_id,
        {
            from: 'User',
            text: 'Hey'
        });
    return axios({
        method: 'POST',
        url: '/shape',
        data: data
    });
};

export const messageFromMe = (ipToCheck) => {
    return window.localStorage.getItem(ID_KEY) === ipToCheck;
};

export const getShapesByBoardId = (boardId) => {
    return axios({
        method: 'GET',
        url: `/${boardId}/shapes`
    });
};

export const getIsManagerForBoard = (boardId) => {
    return axios({
        method: 'GET',
        url: `/manager?ip=${window.localStorage.getItem(ID_KEY)}&boardId=${boardId}`
    });
};

export const getUser = () => {
    return new Promise((resolve, reject) => {
        const idFromLocalStorage = window.localStorage.getItem(ID_KEY);
        if (idFromLocalStorage && idFromLocalStorage !== 'undefined') {
            axios({
                method: 'GET',
                url: `/user/${idFromLocalStorage}`
            })
                .then(response => {
                    if (response.data) {
                        resolve(response);
                    }
                    else {
                        resolve(createUser());
                    }
                })
                .catch(err => reject(err));
        }
        else {
            resolve(createUser());
        }
    });
};

export const createUser = () => {
    return axios({
        method: 'POST',
        url: '/user',
    }).then(response => {
        const {ip} = response.data;
        window.localStorage.setItem(ID_KEY, ip);
        return (response);
    })
};

export const getAllBoards = () => {
    return axios({
        method: 'GET',
        url: '/boards',
    });
};

export const deleteAllShapesByBoardId = (boardId) => {
    socket.emit('delete_board', {board_id: boardId, ip: window.localStorage.getItem(ID_KEY)});
    return axios({
        method: 'DELETE',
        url: `/${boardId}`
    })
};

export const getMaxShapes = () => {
    return axios({
        method: 'GET',
        url: '/config/max'
    })
};