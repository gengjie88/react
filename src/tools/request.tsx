import axios from "axios";
axios.defaults.timeout = 30000;
axios.defaults.timeoutErrorMessage = "连接超时";
axios.defaults.baseURL = "http://localhost:49823";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// axios.interceptors.response.use((response) => {
//     if (response.status === 200) {
//         return response.data
//     }
//     return '请检查网络请求'
    
// })

export default axios