import axios from 'axios';

let base = '/api';

// 获取所有文章
export const queryArticleList = params => {
    return axios.get(`${base}/article/getArticleList`,{params :params});
}

// 新增文章
export const addArticle = params => {
    return axios.post(`${base}/article/addArticle`,params);
}