import './PhieuDat.scss';
import React, { useState, useEffect } from 'react';
import API from '@/services/api';
import Sidebar from '@/components/DefaultLayout/Sidebar/SidebarGV';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';

const MonHoc = () => {
    const [watches, setWatches] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedWatch, setSelectedWatch] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [addLoai, setaddLoai] = useState('');
    const [loai, setLoai] = useState([]);

    useEffect(() => {
        fetchData();
        fetchLoai();
    }, [selectedWatch]);

    async function fetchData() {
        try {
            const token = localStorage.getItem('token');
            //console.log(token);
            const response = await API.get('/phieudat/get-all-phieudat', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setWatches(response.data);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    }

    async function fetchLoai() {
        try {
            const response = await API.get('loai/get-all-nhanvien');
            setLoai(response.data);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    }

    const columns = [
        { field: 'MaPD', headerName: 'Mã phiếu đặt', flex: 1 },
        { field: 'Ho', headerName: 'Họ', flex: 1 },
        { field: 'Ten', headerName: 'Tên', flex: 1 },
        { field: 'DiaChi', headerName: 'Địa Chỉ', flex: 1 },
        { field: 'SDT', headerName: 'Số Điện Thoại', flex: 1 },
        { field: 'NgayDat', headerName: 'Ngày Đặt', flex: 1 },
        { field: 'TrangThai', headerName: 'Trạng Thái', flex: 1 },
        { field: 'DonGia', headerName: 'Đơn Giá', flex: 1 },
        { field: 'MaNVDuyet', headerName: 'Mã Nhân Viên Duyệt', flex: 1 },
    ];

    const rows = watches.map((watch) => ({
        id: watch.MaPD,
        MaPD: watch.MaPD,
        Ho: watch.Ho,
        Ten: watch.Ten,
        DiaChi: watch.DiaChi,
        SDT: watch.SDT,
        NgayDat: watch.NgayDat.substring(0, 10),
        TrangThai: watch.TrangThai,
        DonGia: watch.DonGia,
        MaNVDuyet: watch.MaNVDuyet,
    }));

    const handleRowClick = (params) => {
        // Lấy thông tin đồng hồ từ hàng được bấm
        const selectedRow = params.row;
        setSelectedWatch(selectedRow);
    };

    const handleCapNhatTrangThai = async () => {
        // Thực hiện các thao tác lưu dữ liệu tại đây

        // console.log(selectedWatch.TrangThai);

        try {
            const token = localStorage.getItem('token');
            if (selectedWatch.TrangThai === 'Chờ xác nhận') {
                const check = 1;
                const MaNV = localStorage.getItem('MaNV');
                const response = await API.put(
                    `/phieudat/update-trangthai-by-mapd/${selectedWatch.id}`,
                    {
                        check: check,
                        MaNV: MaNV,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (response.data.success) {
                    setSelectedWatch(false);
                }
            }
            if (selectedWatch.TrangThai === 'Đang chuẩn bị hàng') {
                const check = 2;
                const response = await API.put(
                    `/phieudat/update-trangthai-by-mapd/${selectedWatch.id}`,
                    {
                        check: check,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (response.data.success) {
                    setSelectedWatch(false);
                }
            }
            if (selectedWatch.TrangThai === 'Đang giao') {
                const check = 3;
                const response = await API.put(
                    `/phieudat/update-trangthai-by-mapd/${selectedWatch.id}`,
                    {
                        check: check,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (response.data.success) {
                    setSelectedWatch(false);
                }
            }
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    };

    const handleLapHoaDon = async () => {
        // Thực hiện các thao tác lưu dữ liệu tại đây
        try {
            const token = localStorage.getItem('token');
            console.log(selectedWatch.MaPD, selectedWatch.DonGia);
            const response = await API.post(
                `/hoadon/them-hoadon`,
                {
                    MaPD: selectedWatch.MaPD,
                    TongTien: selectedWatch.DonGia,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                // Xóa đồng hồ thành công
                console.log(' deleted successfully');
                setSelectedWatch(false);
            }
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    };

    const handleDeleteWatch = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await API.delete(`/phieudat/xoa-phieudat-by-mapd/${selectedWatch.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                // Xóa đồng hồ thành công
                console.log(' deleted successfully');
                setSelectedWatch(false);
            } else {
                // Lỗi khi xóa đồng hồ
                console.log('Error deleting ');
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
                                <h1 className="title-72">PHIẾU ĐẶT</h1>
                            </div>
                        </div>
                        <div className="pl_watches anchor-plp-sections">
                            <section className="pl_section js-plp-section" data-group="1612">
                                <div style={{ height: 500, width: '100%' }}>
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
                                                <h2>Thông Tin Phiếu Đặt</h2>
                                                <div class="image-container">
                                                    {/* <img
                                                        src={selectedWatch.image}
                                                        alt={selectedWatch.name}
                                                        className="scaled-img"
                                                    /> */}
                                                </div>
                                                <form>
                                                    <>
                                                        <p className="text">Mã phiếu đặt: {selectedWatch.MaPD}</p>
                                                        <p className="text">Họ: {selectedWatch.Ho}</p>
                                                        <p className="text">Tên: {selectedWatch.Ten}</p>
                                                        <p className="text">Địa Chỉ: {selectedWatch.DiaChi}</p>
                                                        <p className="text">Chuyên Cần: {selectedWatch.SDT}</p>
                                                        <p className="text">Ngày Đặt: {selectedWatch.NgayDat}</p>
                                                        <p className="text">Trạng Thái: {selectedWatch.TrangThai}</p>
                                                        <p className="text">Đơn Giá: {selectedWatch.DonGia}</p>
                                                        <p className="text">
                                                            Mã Nhân Viên Duyệt: {selectedWatch.MaNVDuyet}
                                                        </p>
                                                        {/* <select
                                                            value={addLoai}
                                                            onChange={(e) => setaddLoai(e.target.value)}
                                                        >
                                                            {loai.map((loai) => (
                                                                <option key={loai.id} value={loai.TEN}>
                                                                    Từ ngày: {loai.a}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <select
                                                            value={addLoai}
                                                            onChange={(e) => setaddLoai(e.target.value)}
                                                        >
                                                            {loai.map((loai) => (
                                                                <option key={loai.id} value={loai.TEN}>
                                                                    Đến ngày: {loai.a}
                                                                </option>
                                                            ))}
                                                        </select> */}
                                                    </>

                                                    <div className="btn-container">
                                                        <button
                                                            type="button"
                                                            className="edit-button"
                                                            onClick={handleLapHoaDon}
                                                        >
                                                            <span>IN BÁO CÁO</span>
                                                        </button>
                                                        {selectedWatch.TrangThai === 'Chờ xác nhận' && (
                                                            <button
                                                                type="button"
                                                                className="edit-button"
                                                                onClick={handleCapNhatTrangThai}
                                                            >
                                                                <span>XÁC NHẬN</span>
                                                            </button>
                                                        )}

                                                        {selectedWatch.TrangThai === 'Đang chuẩn bị hàng' && (
                                                            <button
                                                                type="button"
                                                                className="edit-button"
                                                                onClick={handleCapNhatTrangThai}
                                                            >
                                                                <span>GIAO HÀNG</span>
                                                            </button>
                                                        )}

                                                        {selectedWatch.TrangThai === 'Đang giao' && (
                                                            <button
                                                                type="button"
                                                                className="edit-button"
                                                                onClick={handleCapNhatTrangThai}
                                                            >
                                                                <span>HOÀN TẤT</span>
                                                            </button>
                                                        )}
                                                        {/* <button
                                                            type="button"
                                                            className="edit-button"
                                                            onClick={handleSaveClick}
                                                        >
                                                            <span>DUYỆT</span>
                                                        </button> */}
                                                        {selectedWatch.TrangThai !== 'Giao thành công' &&
                                                            selectedWatch.TrangThai !== 'Hoàn thành' && (
                                                                <button
                                                                    type="button"
                                                                    className="delete-button"
                                                                    onClick={handleDeleteWatch}
                                                                >
                                                                    <span>XÓA</span>
                                                                </button>
                                                            )}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="pl_section__header">
                                    {/* <button className="add-watch-button" onClick={() => setShowAddForm(true)}>
                                        THÊM MÔN HỌC
                                    </button> */}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonHoc;
