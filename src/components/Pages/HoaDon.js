import './Loptinchi.scss';
import React, { useState, useEffect } from 'react';
import API from '@/services/api';
import Sidebar from '@/components/DefaultLayout/Sidebar/SidebarGV';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';

const LopTinChi = () => {
    const [watches, setWatches] = useState([]);
    const [phong, setPhong] = useState([]);
    const [monhoc, setMonHoc] = useState([]);
    const [LH, setLH] = useState([]);
    const [LHPH, setLHPH] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedWatch, setSelectedWatch] = useState(null);
    const [selectedLHvaPhong, setSelectedLHvaPhong] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showLHPH, setshowLHPH] = useState(false);

    const [editedNamHoc, setEditedNamHoc] = useState(null);
    const [editedSLToiDa, setEditedSLToiDa] = useState(null);
    const [editedHocKi, setEditedHocKi] = useState(null);
    const [editedNgayBD, setEditedNgayBD] = useState(null);
    const [editedNgayKT, setEditedNgayKT] = useState(null);
    const [editedMaMH, setEditedMaMH] = useState(null);

    const [LHId, setLHId] = useState(null);
    const [phongId, setPhongId] = useState(null);
    const [MHId, setMHId] = useState(null);

    useEffect(() => {
        if (selectedWatch) {
            setEditedNamHoc(selectedWatch.NamHoc);
            setEditedSLToiDa(selectedWatch.SLToiDa);
            setEditedHocKi(selectedWatch.HocKi);
            setEditedNgayBD(selectedWatch.NgayBD);
            setEditedNgayKT(selectedWatch.NgayKT);
            setEditedMaMH(selectedWatch.MaMH);
        }
        fetchData();
        //fetchMonHoc();
    }, [selectedWatch]);

    async function fetchData() {
        try {
            const token = localStorage.getItem('token');
            //console.log(token);
            const response = await API.get('/hoadon/get-all-hoadon', {
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

    async function fetchLH() {
        try {
            const token = localStorage.getItem('token');
            const response = await API.get(`/loptinchi/hienThiLichHocChuaCoTrongLopTinChi/${selectedWatch.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLH(response.data.lichHocChuaCo);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    }

    async function fetchPhong() {
        try {
            const token = localStorage.getItem('token');
            const response = await API.get(`/loptinchi/hienThiPhongHocChuaCoTrongLopTinChi/${selectedWatch.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPhong(response.data.phongHocChuaCo);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    }

    async function fetchMonHoc() {
        try {
            const token = localStorage.getItem('token');
            const response = await API.get(`/monhoc/getallmonhoc`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMonHoc(response.data.monhoc);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    }

    const handleDeletePHLH = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.post(
                '/loptinchi/xoaLichHocVaPhongHoc',
                {
                    MaLTC: selectedWatch.id,
                    MaTGB: selectedLHvaPhong.MaTGB,
                    MaPhongHoc: selectedLHvaPhong.MaPhongHoc,
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
        handleLH();
    };

    const columns = [
        { field: 'MaHD', headerName: 'Ma Hóa Đơn', flex: 1 },
        { field: 'NgayTaoHD', headerName: 'Ngày Tạo Hóa Đơn', flex: 1 },
        { field: 'TongTien', headerName: 'Tổng Tiền', flex: 1 },
        { field: 'MaPD', headerName: 'Mã Phiếu Đặt', flex: 1 },
    ];

    const rows = watches.map((watch) => ({
        id: watch.MaHD,
        MaHD: watch.MaHD,
        NgayTaoHD: watch.NgayTaoHD.substring(0, 10),
        TongTien: watch.TongTien,
        MaPD: watch.MaPD,
    }));

    const handleRowClick = (params) => {
        // Lấy thông tin đồng hồ từ hàng được bấm
        const selectedRow = params.row;
        setSelectedWatch(selectedRow);
    };

    const columnsLHvaPhong = [
        { field: 'MaTGB', headerName: 'Mã TGB', width: 200 },
        { field: 'Thu', headerName: 'Thứ', width: 100 },
        { field: 'Buoi', headerName: 'Buổi', width: 170 },
    ];

    const rowsLHvaPhong = LHPH.map((lhph) => ({
        id: lhph.MaTGB,
        MaTGB: lhph.MaTGB,
        Thu: lhph.Thu,
        Buoi: lhph.Buoi,
        MaPhongHoc: lhph.MaPhongHoc,
    }));

    const handleRowClickLHvaPhong = (params) => {
        // Lấy thông tin đồng hồ từ hàng được bấm
        const selectedRow = params.row;
        setSelectedLHvaPhong(selectedRow);
    };

    //xử lý editing
    const handleIn = () => {};

    const handleLH = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await API.get(`/loptinchi/hienThiLichHocVaPhongHocCuaLopTinChi/${selectedWatch.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.success);
            setLHPH(response.data.lichHocPhongHoc);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
        fetchLH();
        fetchPhong();
        setshowLHPH(true);
    };

    const handleDeleteWatch = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await API.delete(`/hoadon/xoa-hoadon/${selectedWatch.id}`, {
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
                                <h1 className="title-72">Hóa Đơn</h1>
                            </div>
                        </div>
                        <div className="pl_watches anchor-plp-sections">
                            <section className="pl_section js-plp-section" data-group="1612">
                                <div style={{ height: 500, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} onRowClick={handleRowClick} />
                                </div>
                                {selectedWatch && (
                                    <div>
                                        <div className="show-LTC-form-overlay">
                                            <div className="show-LTC-form-container">
                                                <button
                                                    className="close-button"
                                                    onClick={() => {
                                                        setSelectedWatch(false);
                                                        setIsEditing(false);
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </button>
                                                <h2>Thông Tin Hóa đơn</h2>
                                                <form>
                                                    <p className="text">Mã Hóa Đơn: {selectedWatch.MaHD}</p>
                                                    <p className="text">Ngày Tạo Hóa Đơn: {selectedWatch.NgayTaoHD}</p>
                                                    <p className="text">Tổng Tiền: {selectedWatch.TongTien}</p>
                                                    <p className="text">Mã Phiếu Đặt: {selectedWatch.MaPD}</p>

                                                    <div className="btn-container">
                                                        <button
                                                            type="button"
                                                            className="edit-button"
                                                            onClick={handleIn}
                                                        >
                                                            <span>IN</span>
                                                        </button>

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
                                    {/* <button className="add-watch-button" onClick={() => setShowAddForm(true)}>
                                        THÊM LỚP TÍN CHỈ
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

export default LopTinChi;
