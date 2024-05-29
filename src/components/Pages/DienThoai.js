import './GiangVien.scss';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import API from '@/services/api';
import Sidebar from '@/components/DefaultLayout/Sidebar/SidebarGV';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import urlImg from '@/services/urlImg';

const DienThoai = () => {
    const [watches, setWatches] = useState([]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedWatch, setSelectedWatch] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loai, setLoai] = useState([]);
    const [hang, setHang] = useState([]);

    const [addName, setaddName] = useState('');
    const [addGia, setaddGia] = useState('');
    const [addSoLuong, setaddSoLuong] = useState('');
    const [addMoTa, setaddMoTa] = useState('');
    const [addLoai, setaddLoai] = useState('');
    const [addHang, setaddHang] = useState('');

    const [editedName, setEditedName] = useState(null);
    const [editedHocHam, setEditedHocHam] = useState(null);
    const [editedLine, setEditedLine] = useState(1);
    const [editedHocVi, setEditedHocVi] = useState(null);
    const [editedQuantity, setEditedQuantity] = useState(null);
    const [editedType, setEditedType] = useState(null);

    useEffect(() => {
        if (selectedWatch) {
            setEditedName(selectedWatch.HoTen);
            setEditedHocVi(selectedWatch.HocVi);
            setEditedHocHam(selectedWatch.HocHam);
            setEditedLine(selectedWatch.Phai === 'Nam' ? 1 : 0);
            setEditedQuantity(selectedWatch.NgaySinh);
            setEditedType(selectedWatch.DiaChi);
        }

        fetchData();
        fetchLoai();
        fetchHang();
    }, [selectedWatch]);

    async function fetchData() {
        try {
            const token = localStorage.getItem('token');
            //console.log(token);
            const response = await API.get('/dienthoai/get-all-dienthoai', {
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
            });
            setWatches(response.data);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    }

    async function fetchLoai() {
        try {
            const response = await API.get('loai/get-all-loai');
            setLoai(response.data);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    }

    async function fetchHang() {
        try {
            const response = await API.get('hang/get-all-hang');
            setHang(response.data);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    }

    const getLoaiId = (lineName) => {
        const loais = loai.find((loai) => loai.TenLoai === lineName);
        return loais ? loais._id : '';
    };

    const getHangId = (lineName) => {
        const hangs = hang.find((hang) => hang.TenHang === lineName);
        return hangs ? hangs._id : '';
    };

    // if (fileInput && fileInput.files.length > 0) {
    //     const response = await API.post(
    //         '/giangvien/themgiangvien',
    //         {
    //             Ten: addName,
    //             Gia: addGia,
    //             SoLuong: addSoLuong,
    //             MoTa: addMoTa,
    //         },
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         },
    //     );

    //     if (response.status === 200) {
    //         console.log('Thêm giảng viên thành công');
    //         console.log('Mã giảng viên:', response.data.MaGV);
    //     } else {
    //         console.log('Lỗi khi thêm giảng viên');
    //     }
    // } else {
    //     console.log('No file selected');
    // }

    const handleAddGiangVien = async () => {
        try {
            // console.log(getHangId(addHang), getLoaiId(addLoai));
            console.log(addName, addGia, addSoLuong, addMoTa);
            // const fileInput = document.getElementById('fileInput');
            const token = localStorage.getItem('token');

            // if (fileInput && fileInput.files.length > 0) {
            //     const file = fileInput.files[0];
            //     console.log(file);
            const formData = new FormData();
            formData.append('TenDT', addName);
            formData.append('Gia', addGia);
            formData.append('SoLuong', addSoLuong);
            formData.append('MoTa', addMoTa);
            //formData.append('HinhAnh', file);
            formData.append('MaLoai', 'L1');
            formData.append('MaHang', 'H1');
            const response = await API.post(
                '/dienthoai/them-dienthoai',
                {
                    TenDT: addName,
                    Gia: addGia,
                    SoLuong: addSoLuong,
                    MoTa: addMoTa,
                    MaLoai: 'L1',
                    MaHang: 'H1',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.status === 200) {
                console.log('Thêm giảng viên thành công');
            } else {
                console.log('Lỗi khi thêm giảng viên');
            }
            // } else {
            //     console.log('No file selected');
            // }
        } catch (error) {
            console.log('Lỗi khi gọi API:', error);
        }
        setShowAddForm(false);
        fetchData();
    };

    //data
    const columns = [
        { field: 'MaDT', headerName: 'Mã điện thoại', flex: 1 },
        { field: 'TenDT', headerName: 'Tên', flex: 1 },
        { field: 'Gia', headerName: 'Giá($)', flex: 1 },
        { field: 'SoLuong', headerName: 'Số Lượng', flex: 1 },
    ];

    const rows = watches.map((watch) => ({
        id: watch.MaDT,
        MaDT: watch.MaDT,
        TenDT: watch.TenDT,
        Gia: watch.Gia,
        SoLuong: watch.SoLuong,
        MoTa: watch.MoTa,
        HinhAnh: watch.HinhAnh,
        MaHang: watch.MaHang,
        MaLoai: watch.MaLoai,
    }));

    const handleRowClick = (params) => {
        // Lấy thông tin đồng hồ từ hàng được bấm
        const selectedRow = params.row;
        setSelectedWatch(selectedRow);
    };

    //xử lý editing
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        // Thực hiện các thao tác lưu dữ liệu tại đây
        try {
            const token = localStorage.getItem('token');
            console.log(selectedWatch.id);
            console.log(editedName);
            console.log(editedHocVi);
            console.log(editedHocHam);
            console.log(editedLine);
            console.log(editedQuantity);
            console.log(editedType);
            const response = await API.put(
                `/giangvien/suaGiangVien/${selectedWatch.id}`,
                {
                    //watchId: selectedWatch.id,
                    HoTen: editedName,
                    HocVi: editedHocVi,
                    HocHam: editedHocHam,
                    Phai: editedLine,
                    NgaySinh: editedQuantity,
                    DiaChi: editedType,
                    //Active:
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.data.success) {
                console.log('Watch updated successfully');
                // Xử lý thành công sau khi cập nhật đồng hồ
                setSelectedWatch({
                    ...selectedWatch,
                    HoTen: editedName,
                    HocVi: editedHocVi,
                    HocHam: editedHocHam,
                    Phai: editedLine === 1 ? 'Nam' : 'Nữ',
                    NgaySinh: editedQuantity,
                    DiaChi: editedType,
                });
            } else {
                console.log('Failed to update watch');
                // Xử lý khi cập nhật đồng hồ không thành công
            }
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }

        setIsEditing(false);
    };

    const handleDeleteWatch = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await API.delete(`/dienthoai/xoa-dienthoai-by-madt/${selectedWatch.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                // Xóa đồng hồ thành công
                console.log('Watch deleted successfully');
                setSelectedWatch(false);
            } else {
                // Lỗi khi xóa đồng hồ
                console.log('Error deleting watch');
            }
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
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
                                <h1 className="title-72">Điện thoại</h1>
                            </div>
                        </div>
                        <div className="pl_watches anchor-plp-sections">
                            <section className="pl_section js-plp-section" data-group="1612">
                                {showAddForm && (
                                    <div className="add-watch-form-overlay">
                                        <div className="add-watch-form-container">
                                            <button className="close-button" onClick={() => setShowAddForm(false)}>
                                                <CloseIcon />
                                            </button>
                                            <h4>Thêm</h4>
                                            <input
                                                type="text"
                                                placeholder="Tên"
                                                value={addName}
                                                onChange={(e) => setaddName(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Giá"
                                                value={addGia}
                                                onChange={(e) => setaddGia(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Số Lượng"
                                                value={addSoLuong}
                                                onChange={(e) => setaddSoLuong(e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Mô Tả"
                                                value={addMoTa}
                                                onChange={(e) => setaddMoTa(e.target.value)}
                                            />
                                            <select
                                                id="lineComboBox"
                                                value={addLoai}
                                                onChange={(e) => setaddLoai(e.target.value)}
                                            >
                                                {loai.map((loai) => (
                                                    <option key={loai.id} value={loai.TenLoai}>
                                                        Loại: {loai.TenLoai}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                id="lineComboBox"
                                                value={addHang}
                                                onChange={(e) => setaddHang(e.target.value)}
                                            >
                                                {hang.map((hang) => (
                                                    <option key={hang._MaHang} value={hang.TenHang}>
                                                        Hãng: {hang.TenHang}
                                                    </option>
                                                ))}
                                            </select>
                                            <input type="file" id="fileInput" />

                                            <button className="add-button" onClick={handleAddGiangVien}>
                                                <span>Xác Nhận</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div style={{ height: 450, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} onRowClick={handleRowClick} />
                                </div>
                                {selectedWatch && (
                                    <div>
                                        <div className="show-watch-form-overlay">
                                            <div className="show-watch-form-container">
                                                <button
                                                    className="close-button"
                                                    onClick={() => {
                                                        setSelectedWatch(false);
                                                        setIsEditing(false);
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </button>
                                                <h2>Thông Tin Điện Thoại</h2>
                                                <div class="image-container">
                                                    <img
                                                        src={urlImg + selectedWatch.HinhAnh}
                                                        alt={selectedWatch.TenDT}
                                                        className="scaled-img"
                                                    />
                                                </div>
                                                <form>
                                                    {isEditing ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                value={editedName}
                                                                onChange={(e) => setEditedName(e.target.value)}
                                                            />

                                                            <select
                                                                id="hocViComboBox"
                                                                value={editedHocVi}
                                                                onChange={(e) => setEditedHocVi(e.target.value)}
                                                            >
                                                                <option value="Kỹ Sư">Kỹ Sư</option>
                                                                <option value="Thạc Sĩ">Thạc Sĩ</option>
                                                                <option value="Tiến Sĩ">Tiến Sĩ</option>
                                                            </select>
                                                            <select
                                                                id="hocHamComboBox"
                                                                value={editedHocHam}
                                                                onChange={(e) => setEditedHocHam(e.target.value)}
                                                            >
                                                                <option value="Giáo Sư">Giáo Sư</option>
                                                                <option value="Phó Giáo Sư">Phó Giáo Sư</option>
                                                            </select>

                                                            <input
                                                                type="text"
                                                                value={editedQuantity}
                                                                onChange={(e) => setEditedQuantity(e.target.value)}
                                                            />
                                                            <input
                                                                type="text"
                                                                value={editedType}
                                                                onChange={(e) => setEditedType(e.target.value)}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="text">Tên: {selectedWatch.TenDT}</p>
                                                            <p className="text">Giá: {selectedWatch.Gia}$</p>
                                                            <p className="text">Số Lượng: {selectedWatch.SoLuong}</p>
                                                            <p className="text">Mô Tả: {selectedWatch.MoTa}</p>
                                                        </>
                                                    )}
                                                    <div className="btn-container">
                                                        {isEditing ? (
                                                            <button
                                                                type="button"
                                                                className="edit-button"
                                                                onClick={handleSaveClick}
                                                            >
                                                                <span>LƯU</span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                className="edit-button"
                                                                onClick={handleEditClick}
                                                            >
                                                                <span>SỪA</span>
                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="delete-button"
                                                            onClick={handleDeleteWatch}
                                                        >
                                                            <span>XÓA</span>
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="pl_section__header">
                                    <button className="add-watch-button" onClick={() => setShowAddForm(true)}>
                                        THÊM ĐIỆN THOẠI
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

export default DienThoai;
