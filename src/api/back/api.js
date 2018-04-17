import axios from 'axios';

let base = '/api';

// 获取所有文章
export const queryArticleList = params => {
    return axios.post(`${base}/article/getArticleList`, params);
}

// 新增文章
export const addArticle = params => {
    return axios.post(`${base}/article/addArticle`, params);
}

// 根据id查询文章
export const queryArticleById = params => {
    return axios.post(`${base}/article/getArticleById`, params);
}

// 修改文章
export const editArticle = params => {
    return axios.post(`${base}/article/editArticle`, params);
}

// 删除文章
export const removeArticle = params => {
    return axios.post(`${base}/article/removeArticle`, params);
}

// 修改文章发布
export const toggleArticlePublish = params => {
    return axios.post(`${base}/article/toggleArticlePublish`, params);
}

// 上传图片
export const uploadImg = params => {
    // return axios.post(`${base}/article/editorUpload`,params);
    return axios({
        url: `${base}/article/editorUpload`,
        method: 'post',
        data: params,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}
