import axios from "axios";

export const addShape = (data) => {
    return axios({
        method: 'POST',
        url: '/shape',
        data: data
    });
};

export const getShapesByBoardId = (boardId) => {
    return axios({
        method: 'GET',
        url: `/${boardId}/shapes`
    });
};

export const getUserInfo = () => {
    return axios({
        method: 'GET',
        url: '/user',
        maxRedirects: 100
    });
};

export const createUser = () => {
    return new Promise((resolve, reject) => {
        getUserInfo()
            .then(response => {
                if (response.data === null) {
                    return axios({
                        method: 'POST',
                        url: '/user'
                    });
                }
                else {
                    return response;
                }
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => reject(err));
    });
};

export const getAllBoards = () => {
    return axios({
        method: 'GET',
        url: '/boards',
    });
};

export const deleteAllShapesByBoardId = (boardId) => {
    return axios({
        method: 'DELETE',
        url: `/${boardId}`
    })
};