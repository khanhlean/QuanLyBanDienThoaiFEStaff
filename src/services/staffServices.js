import API from '../services/api';
import axios from 'axios';
//goi api dang nhap nhan vien
const handleLogin = (SDT, Password) => {
    return API.post('/taikhoan/dangnhapNV', { SDT, Password });
};

// const getUserInfo = async (token) => {
//     try {
//         const response = await API.get('/account/staff-login', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// };

// const getAllWatches = () => {
//     const token = localStorage.getItem('token');
//     return API.get('/watch/get-all-watches', {
//         headers: {
//             Authorization: `Bearer ${token}`, // Thay 'token' bằng tên key lưu trữ token của bạn
//         },
//     });
// };

export { handleLogin };
