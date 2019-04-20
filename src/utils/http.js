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
    getUserInfo()
        .then(response => {
            if (response.data === null) {
                axios({
                    method: 'POST',
                    url: '/user'
                });
            }
        });

};