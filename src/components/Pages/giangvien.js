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
    const [LTC, setLTC] = useState([]);
    const [KNDCo, setKNDCo] = useState([]);
    const [KNDChua, setKNDChua] = useState([]);
    const [TGBChua, setTGBChua] = useState([]);
    const [TGBCo, setTGBCo] = useState([]);

    const [daPC, setdaPC] = useState([]);
    const [chuaPC, setchuaPC] = useState([]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [showDataGridPC, setShowDataGridPC] = useState(false);
    const [showTGB, setshowTGB] = useState(false);
    const [showKND, setshowKND] = useState(false);
    const [selectedWatch, setSelectedWatch] = useState(null);
    const [selectedChuaPC, setSelectedChuaPC] = useState('');
    const [selectedDaPC, setSelectedDaPC] = useState('');
    const [selectedKNDCo, setSelectedKNDCo] = useState('');
    const [selectedKNDChua, setSelectedKNDChua] = useState('');
    const [selectedTGBCo, setSelectedTGBCo] = useState('');
    const [selectedTGBChua, setSelectedTGBChua] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const [addName, setaddName] = useState('');
    const [addHocVi, setaddHocVi] = useState('');
    const [addHocHam, setaddHocHam] = useState('');
    const [addPhai, setaddPhai] = useState(1);
    const [addNgaySinh, setaddNgaySinh] = useState('');
    const [addDiaChi, setaddDiaChi] = useState('');

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

    const handleAddGiangVien = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.post(
                '/giangvien/themgiangvien',
                {
                    HoTen: addName,
                    HocVi: addHocVi,
                    HocHam: addHocHam,
                    Phai: addPhai,
                    NgaySinh: addNgaySinh,
                    DiaChi: addDiaChi,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.status === 200) {
                console.log('Thêm giảng viên thành công');
                console.log('Mã giảng viên:', response.data.MaGV);
            } else {
                console.log('Lỗi khi thêm giảng viên');
            }
        } catch (error) {
            console.log('Lỗi khi gọi API:', error);
        }
        setShowAddForm(false);
        fetchData();
    };

    const handleAddTGB = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.post(
                '/giangvien/themBuoiCoTheDay',
                {
                    MaGV: selectedWatch.MaGV,
                    MaTGB: selectedTGBChua.MaTGB,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(response.status);
            if (response.status === 200) {
            } else {
                // console.log(response.data.error);
                // setErrorMessage(response.data.error); // Gán thông báo lỗi vào state
            }
        } catch (error) {
            console.log('Lỗi khi gọi API:', error);
        }

        handleThoiGianBieuClick();
    };

    const handleDeleteTGB = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.post(
                '/giangvien/xoaBuoiCoTheDay',
                {
                    MaGV: selectedWatch.MaGV,
                    MaTGB: selectedTGBCo.MaTGB,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(response.status);
            if (response.status === 200) {
            } else {
                // console.log(response.data.error);
                // setErrorMessage(response.data.error); // Gán thông báo lỗi vào state
            }
        } catch (error) {
            console.log('Lỗi khi gọi API:', error);
        }
        handleThoiGianBieuClick();
    };

    const handleAddKND = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.post(
                '/giangvien/themKhaNangDay',
                {
                    MaGV: selectedWatch.MaGV,
                    MaMH: selectedKNDChua.MaMH,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(response.status);
            if (response.status === 200) {
            } else {
                // console.log(response.data.error);
                // setErrorMessage(response.data.error); // Gán thông báo lỗi vào state
            }
        } catch (error) {
            console.log('Lỗi khi gọi API:', error);
        }
        handleKhaNangDayClick();
    };

    const handleDeleteKND = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await API.post(
                '/giangvien/xoaKhaNangDay',
                {
                    MaGV: selectedWatch.MaGV,
                    MaMH: selectedKNDCo.MaMH,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(response.status);
            if (response.status === 200) {
            } else {
                // console.log(response.data.error);
                // setErrorMessage(response.data.error); // Gán thông báo lỗi vào state
            }
        } catch (error) {
            console.log('Lỗi khi gọi API:', error);
        }
        handleKhaNangDayClick();
    };

    const handleAddPC = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.post(
                '/giangvien/phanCongGiangVien',
                {
                    MaGV: selectedWatch.MaGV,
                    MaLTC: selectedChuaPC.MaLTC,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(response.status);
            if (response.status === 200) {
            } else {
                // console.log(response.data.error);
                // setErrorMessage(response.data.error); // Gán thông báo lỗi vào state
            }
        } catch (error) {
            console.log('Lỗi khi gọi API:', error);
        }
        handlePhanCongClick();
    };

    const handleDeletePC = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await API.post(
                '/giangvien/xoaPhanCongGiangVien',
                {
                    MaGV: selectedWatch.MaGV,
                    MaLTC: selectedDaPC.MaLTC,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(response.status);
            if (response.status === 200) {
            } else {
                // console.log(response.data.error);
                // setErrorMessage(response.data.error); // Gán thông báo lỗi vào state
            }
        } catch (error) {
            console.log('Lỗi khi gọi API:', error);
        }
        handlePhanCongClick();
    };

    //data
    const columns = [
        { field: 'MaDT', headerName: 'Mã điện thoại', flex: 1 },
        { field: 'TenDT', headerName: 'Tên', flex: 1 },
        { field: 'Gia', headerName: 'Giá($)', flex: 1 },
        { field: 'SoLuong', headerName: 'Số Lượng', flex: 1 },
        { field: 'MoTa', headerName: 'Mô Tả', flex: 1 },
    ];

    const rows = watches.map((watch) => ({
        id: watch.MaDT,
        MaDT: watch.MaDT,
        TenDT: watch.TenDT,
        Gia: watch.Gia,
        SoLuong: watch.SoLuong,
        MoTa: watch.MoTa,
        HinhAnh: watch.HinhAnh,
        TrangThai: watch.TrangThai,
        MaHang: watch.MaHang,
        MaLoai: watch.MaLoai,
    }));

    const handleRowClick = (params) => {
        // Lấy thông tin đồng hồ từ hàng được bấm
        const selectedRow = params.row;
        setSelectedWatch(selectedRow);
    };

    const handleDateChange = (date) => {
        const formattedDate = format(new Date(date), 'yyyy-MM-dd');
        setaddNgaySinh(formattedDate);
    };

    const handleAddPhaiChange = (e) => {
        const value = parseInt(e.target.value);
        setaddPhai(value);
    };

    const handleEditPhaiChange = (e) => {
        const value = parseInt(e.target.value);
        setEditedLine(value);
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

    const handleThoiGianBieuClick = async () => {
        // Thực hiện các thao tác lưu dữ liệu tại đây
        const token = localStorage.getItem('token');
        try {
            const response = await API.get(`/giangvien/hienThiBuoiCoTheDay/${selectedWatch.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                console.log('Watch updated successfully');
                setTGBCo(response.data.buoiCoTheDay);
            } else {
                console.log('Failed to update watch');
                // Xử lý khi cập nhật đồng hồ không thành công
            }
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }

        try {
            const response = await API.get(`/giangvien/hienThiBuoiChuaTheDay/${selectedWatch.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                console.log('Watch updated successfully');
                setTGBChua(response.data.buoiChuaTheDay);
            } else {
                console.log('Failed to update watch');
                // Xử lý khi cập nhật đồng hồ không thành công
            }
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }

        setshowTGB(true);
    };

    const handlePhanCongClick = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await API.get(
                `/giangvien/hienThiBangPhanCongTheoGiangVien/${selectedWatch.id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.data.success) {
                // Xử lý thành công sau khi cập nhật
                setdaPC(response.data.data);

                // Xử lý khi cập nhật đồng hồ không thành công
            }
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }

        try {
            const token = localStorage.getItem('token');

            const response = await API.get(
                `/giangvien/hienThiBangChuaPhanCongTheoGiangVien/${selectedWatch.id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.data.success) {
                // Xử lý thành công sau khi cập nhật
                setchuaPC(response.data.data);

                // Xử lý khi cập nhật đồng hồ không thành công
            }
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }

        setShowDataGridPC(true);
    };

    const handleKhaNangDayClick = async () => {
        // Thực hiện các thao tác lưu dữ liệu tại đây
        try {
            const token = localStorage.getItem('token');

            const response = await API.get(
                `/giangvien/hienThiKhaNangDay/${selectedWatch.id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.data.success) {
                // Xử lý thành công sau khi cập nhật
                setKNDCo(response.data.khaNangDay);

                // Xử lý khi cập nhật đồng hồ không thành công
            }
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }

        try {
            const token = localStorage.getItem('token');

            const response = await API.get(
                `/giangvien/hienThiMonChuaTheDay/${selectedWatch.id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.data.success) {
                // Xử lý thành công sau khi cập nhật
                setKNDChua(response.data.monChuaTheDay);

                // Xử lý khi cập nhật đồng hồ không thành công
            }
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
        setshowKND(true);
    };

    const handleDeleteWatch = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await API.delete(`/giangvien/xoaGiangVien/${selectedWatch.id}`, {
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

            const confirmed = window.confirm('Xóa mềm?');
            if (confirmed) {
                await API.put(`/giangvien/choGiangVienNghi/${selectedWatch.id}`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Giảng viên đã được xóa mềm thành công');
                setSelectedWatch(false);
            } else {
                console.log('Không xóa giảng viên');
            }
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
                                                placeholder="Họ và Tên"
                                                value={addName}
                                                onChange={(e) => setaddName(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Học Vị"
                                                value={addHocVi}
                                                onChange={(e) => setaddHocVi(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Học Hàm"
                                                value={addHocHam}
                                                onChange={(e) => setaddHocHam(e.target.value)}
                                            />

                                            <select id="lineComboBox" value={addPhai} onChange={handleAddPhaiChange}>
                                                <option value="1">Nam</option>
                                                <option value="0">Nữ</option>
                                            </select>

                                            <input
                                                type="text"
                                                placeholder="Ngày Sinh"
                                                value={addNgaySinh}
                                                onChange={(e) => handleDateChange(e.target.value)}
                                            />

                                            <input
                                                type="text"
                                                placeholder="Địa Chỉ"
                                                value={addDiaChi}
                                                onChange={(e) => setaddDiaChi(e.target.value)}
                                            />

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

                                                            <select
                                                                id="lineComboBox"
                                                                value={editedLine}
                                                                onChange={handleEditPhaiChange}
                                                            >
                                                                <option value="1">Nam</option>
                                                                <option value="0">Nữ</option>
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
