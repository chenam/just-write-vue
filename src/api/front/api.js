import axios from 'axios';
import qs from 'qs';
let base = '/api';

// 获取文章
export const queryArticleList = params => {
    return axios.post(`${base}/front/getArticle`, qs.stringify(params));
}
