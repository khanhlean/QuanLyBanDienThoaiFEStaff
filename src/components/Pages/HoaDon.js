import './HoaDon.scss';
import React, { useState, useEffect } from 'react';
import API from '@/services/api';
import Sidebar from '@/components/DefaultLayout/Sidebar/SidebarGV';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';

const LopTinChi = () => {
    const [watches, setWatches] = useState([]);
    const [selectedWatch, setSelectedWatch] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchData();
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

            console.log(response.data);

            setWatches(response.data);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    }

    const columns = [
        { field: 'MaHD', headerName: 'Ma Hóa Đơn', flex: 1 },
        { field: 'NgayTaoHD', headerName: 'Ngày Tạo Hóa Đơn', flex: 1 },
        { field: 'TongTien', headerName: 'Tổng Tiền', flex: 1 },
        // { field: 'MaPD', headerName: 'Mã Phiếu Đặt', flex: 1 },
    ];

    const rows = watches.map((watch) => ({
        id: watch.MaHD,
        MaHD: watch.MaHD,
        NgayTaoHD: watch.NgayTaoHD.substring(0, 10),
        TongTien: watch.TongTien,
        MaPD: watch.MaPD,
        Ten: watch.Ten,
        DiaChi: watch.DiaChi,
        SDT: watch.SDT,
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

    //xử lý editing
    const handleIn = () => {};

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
                                                    <p className="text">Tên người đặt: {selectedWatch.Ten}</p>
                                                    <p className="text">Địa chỉ: {selectedWatch.DiaChi}</p>
                                                    <p className="text">Số điện thoại: {selectedWatch.SDT}</p>
                                                    <p className="text">Sản phẩm: Iphone 14 Pro</p>
                                                    <p className="text">Quà tặng kèm: AirPod </p>
                                                    <p className="text">Tổng Tiền: {selectedWatch.TongTien}</p>

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
                                <div className="pl_section__header"></div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LopTinChi;
