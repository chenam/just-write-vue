import axios from 'axios';

let base = '/api';

// 获取所有文章
export const queryArticleList = params => {
    return axios.post(`${base}/article/getArticleList`,params);
}

// 新增文章
export const addArticle = params => {
    return axios.post(`${base}/article/addArticle`,params);
}

// 根据id查询文章
export const queryArticleById = params => {
    return axios.post(`${base}/article/getArticleById`,params);
}

// 删除文章
export const editArticle = params => {
    return axios.post(`${base}/article/editArticle`,params);
}

// 修改文章
export const removeArticle = params => {
    return axios.post(`${base}/article/removeArticle`,params);
}