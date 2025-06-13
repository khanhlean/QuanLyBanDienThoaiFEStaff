import './KhachHang.scss';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import urlImg from '@/services/urlImg';
import API from '@/services/api';
import Sidebar from '@/components/DefaultLayout/Sidebar/SidebarGV';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';

const KhachHang = () => {
    const [khachHangs, setKhachHangs] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedKhachHang, setSelectedKhachHang] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // State cho form thêm mới
    const [addHo, setAddHo] = useState('');
    const [addTen, setAddTen] = useState('');
    const [addDiaChi, setAddDiaChi] = useState('');
    const [addSDT, setAddSDT] = useState('');
    const [addEmail, setAddEmail] = useState('');
    const [addPassword, setAddPassword] = useState('');

    // State cho form chỉnh sửa
    const [editedHo, setEditedHo] = useState('');
    const [editedTen, setEditedTen] = useState('');
    const [editedDiaChi, setEditedDiaChi] = useState('');
    const [editedSDT, setEditedSDT] = useState('');
    const [editedEmail, setEditedEmail] = useState('');

    useEffect(() => {
        if (selectedKhachHang) {
            setEditedHo(selectedKhachHang.Ho);
            setEditedTen(selectedKhachHang.Ten);
            setEditedDiaChi(selectedKhachHang.DiaChi);
            setEditedSDT(selectedKhachHang.SDT);
            setEditedEmail(selectedKhachHang.Email);
        }
        fetchData();
    }, [selectedKhachHang]);

    async function fetchData() {
        try {
            const token = localStorage.getItem('token');
            const response = await API.get('/khachhang/get-all-khachhang', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setKhachHangs(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddKhachHang = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.post(
                '/khachhang/them-khach-hang',
                {
                    Ho: addHo,
                    Ten: addTen,
                    DiaChi: addDiaChi,
                    SDT: addSDT,
                    Email: addEmail,
                    Password: addPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.status === 200) {
                console.log('Thêm khách hàng thành công');
            } else {
                console.log('Lỗi khi thêm khách hàng');
            }
        } catch (error) {
            console.log('Lỗi khi gọi API:', error);
        }
        setShowAddForm(false);
        fetchData();
    };

    const columns = [
        { field: 'Ho', headerName: 'Họ', width: 200 },
        { field: 'Ten', headerName: 'Tên', width: 200 },
        { field: 'DiaChi', headerName: 'Địa Chỉ', width: 400 },
        { field: 'SDT', headerName: 'SĐT', width: 200 },
        { field: 'Email', headerName: 'Email', width: 200 },
    ];

    const rows = khachHangs.map((khachHang) => ({
        id: khachHang.MaKH,
        MaKH: khachHang.MaKH,
        Ho: khachHang.Ho,
        Ten: khachHang.Ten,
        DiaChi: khachHang.DiaChi,
        Email: khachHang.Email,
        SDT: khachHang.SDT,
    }));

    const handleRowClick = (params) => {
        const selectedRow = params.row;
        setSelectedKhachHang(selectedRow);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.put(
                `/khachhang/suakhachhang/${selectedKhachHang.MaKH}`,
                {
                    Ho: editedHo,
                    Ten: editedTen,
                    DiaChi: editedDiaChi,
                    SDT: editedSDT,
                    Email: editedEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.data.success) {
                console.log('Cập nhật khách hàng thành công');
                setSelectedKhachHang({
                    ...selectedKhachHang,
                    Ho: editedHo,
                    Ten: editedTen,
                    DiaChi: editedDiaChi,
                    SDT: editedSDT,
                    Email: editedEmail,
                });
            } else {
                console.log('Cập nhật khách hàng thất bại');
            }
        } catch (error) {
            console.error(error);
        }
        setIsEditing(false);
    };

    const handleDeleteKhachHang = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await API.delete(`/khachhang/xoakhachhang/${selectedKhachHang.MaKH}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                console.log('Xóa khách hàng thành công');
                setSelectedKhachHang(null);
            } else {
                console.log('Lỗi khi xóa khách hàng');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="form_watchlist">
                <div id="watchlist_container">
                    <div className="watchlist_content">
                        <div className="pl_header">
                            <div className="pl_header__title">
                                <h1 className="title-72">Khách Hàng</h1>
                            </div>
                        </div>
                        <div className="pl_watches anchor-plp-sections">
                            <section className="pl_section js-plp-section" data-group="1612">
                                {showAddForm && (
                                    <div className="add-watch-form-overlay">
                                        <div className="add-watch-form-container">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <h4 className=" m-0">Thêm Khách Hàng</h4>
                                                <button className="close-button" onClick={() => setShowAddForm(false)}>
                                                    <CloseIcon />
                                                </button>
                                            </div>

                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                placeholder="Họ"
                                                value={addHo}
                                                onChange={(e) => setAddHo(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                placeholder="Tên"
                                                value={addTen}
                                                onChange={(e) => setAddTen(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                placeholder="Địa Chỉ"
                                                value={addDiaChi}
                                                onChange={(e) => setAddDiaChi(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                placeholder="Số điện thoại"
                                                value={addSDT}
                                                onChange={(e) => setAddSDT(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                className="form-control mb-3"
                                                placeholder="Email"
                                                value={addEmail}
                                                onChange={(e) => setAddEmail(e.target.value)}
                                            />
                                            <input
                                                type="password"
                                                className="form-control mb-3"
                                                placeholder="Mật khẩu"
                                                value={addPassword}
                                                onChange={(e) => setAddPassword(e.target.value)}
                                            />

                                            <button className="add-button" onClick={handleAddKhachHang}>
                                                Xác Nhận
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div style={{ height: 500, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} onRowClick={handleRowClick} />
                                </div>
                                {selectedKhachHang && (
                                    <div>
                                        <div className="show-watch-form-overlay">
                                            <div className="show-watch-form-container">
                                                <button
                                                    className="btn-close position-absolute"
                                                    style={{ top: '15px', right: '15px' }}
                                                    onClick={() => {
                                                        setSelectedKhachHang(null);
                                                        setIsEditing(false);
                                                    }}
                                                ></button>
                                                <h2>Thông Tin Khách Hàng</h2>
                                                <div class="image-container">
                                                    {/* <img
                                                        src={urlImg + selectedWatch.HinhAnh}
                                                        alt={selectedWatch.TenDT}
                                                        className="scaled-img"
                                                    /> */}
                                                </div>
                                                <form>
                                                    {isEditing ? (
                                                        <div className="mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                value={editedHo}
                                                                onChange={(e) => setEditedHo(e.target.value)}
                                                                placeholder="Họ"
                                                            />
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                value={editedTen}
                                                                onChange={(e) => setEditedTen(e.target.value)}
                                                                placeholder="Tên"
                                                            />
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                value={editedDiaChi}
                                                                onChange={(e) => setEditedDiaChi(e.target.value)}
                                                                placeholder="Địa chỉ"
                                                            />
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                value={editedSDT}
                                                                onChange={(e) => setEditedSDT(e.target.value)}
                                                                placeholder="Số điện thoại"
                                                            />
                                                            <input
                                                                type="text"
                                                                className="form-control mb-3"
                                                                value={editedEmail}
                                                                onChange={(e) => setEditedEmail(e.target.value)}
                                                                placeholder="Email"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="card border-0">
                                                            <div className="card-body p-0">
                                                                <p className="card-text py-2 border-bottom">
                                                                    <strong>Họ:</strong> {selectedKhachHang.Ho}
                                                                </p>
                                                                <p className="card-text py-2 border-bottom">
                                                                    <strong>Tên:</strong> {selectedKhachHang.Ten}
                                                                </p>
                                                                <p className="card-text py-2 border-bottom">
                                                                    <strong>Địa Chỉ:</strong> {selectedKhachHang.DiaChi}
                                                                </p>
                                                                <p className="card-text py-2 border-bottom">
                                                                    <strong>SĐT:</strong> {selectedKhachHang.SDT}
                                                                </p>
                                                                <p className="card-text py-2">
                                                                    <strong>Email:</strong> {selectedKhachHang.Email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="d-flex justify-content-end gap-2 mt-4">
                                                        {isEditing ? (
                                                            <button
                                                                type="button"
                                                                className="btn btn-success"
                                                                onClick={handleSaveClick}
                                                            >
                                                                Lưu
                                                            </button>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                className="edit-button"
                                                                onClick={handleEditClick}
                                                            >
                                                                Sửa
                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="delete-button"
                                                            onClick={handleDeleteKhachHang}
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="pl_section__header mt-3">
                                    <button className="add-watch-button" onClick={() => setShowAddForm(true)}>
                                        <i className="fa fa-plus me-2"></i>Thêm Khách hàng
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KhachHang;
