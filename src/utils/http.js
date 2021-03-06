import axios from "axios";
import socketIOClient from "socket.io-client";

const ID_KEY = `_id:${window.location.host}`;
export let socket;

export const initSocket = () => {
    socket = socketIOClient(document.location.origin);
};

export const addShape = (data) => {
    data = {...data, ip: window.localStorage.getItem(ID_KEY)};
    socket.emit('update_board', data);
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

export const getUserShapeLimits = () => {
    const idFromLocalStorage = window.localStorage.getItem(ID_KEY);
    return axios({
        method: 'GET',
        url: `/user/${idFromLocalStorage}/limit?force=true`
    })
};

export const handleSocketData = (boardId, onAddShape, onManagerDeletedShapes, onResetShapeCount) => {
    socket.on(boardId, (data) => {
        if (!messageFromMe(data.ip)) {
            onAddShape(data);
        }
    });
    socket.on(`delete:${boardId}`, (ip) => {
        if (!messageFromMe(ip)) {
            onManagerDeletedShapes();
        }
    });
    socket.on('reset_shapes', () => {
        onResetShapeCount();
    })
};