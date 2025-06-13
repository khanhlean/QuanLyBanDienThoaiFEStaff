import './DienThoai.scss';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import API from '@/services/api';
import Sidebar from '@/components/DefaultLayout/Sidebar/SidebarGV';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import urlImg from '@/services/urlImg';

const QuaTang = () => {
    const [watches, setWatches] = useState([]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedWatch, setSelectedWatch] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [addName, setaddName] = useState('');
    const [addMoTa, setaddMoTa] = useState('');

    const [editedName, setEditedName] = useState(null);
    const [editedMoTa, setEditedMoTa] = useState(null);

    useEffect(() => {
        if (selectedWatch) {
            setEditedName(selectedWatch.TenLoai);
            setEditedMoTa(selectedWatch.MoTa);
        }

        fetchData();
    }, [selectedWatch]);

    async function fetchData() {
        try {
            const token = localStorage.getItem('token');
            //console.log(token);
            const response = await API.get('/khuyenmai/get-all-quatang', {
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
                '/loai/them-loai',
                {
                    TenLoai: addName,
                    MoTa: addMoTa,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(addName, addMoTa);
            if (response.status === 200) {
                console.log('Thêm giảng viên thành công');
            } else {
                console.log('Lỗi khi thêm giảng viên');
            }
        } catch (error) {
            console.log('Lỗi khi gọi API:', error);
        }
        setShowAddForm(false);
        fetchData();
    };

    //data
    const columns = [
        { field: 'Ten', headerName: 'Tên', flex: 1 },
        { field: 'MaHang', headerName: 'Mã hãng', flex: 1 },
        { field: 'HinhAnh', headerName: 'Hình ảnh', flex: 1 },
    ];

    const rows = watches.map((watch) => ({
        id: watch.MaQT,
        Ten: watch.Ten,
        MaHang: watch.MaHang,
        HinhAnh: watch.HinhAnh,
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
            const response = await API.put(
                `/loai/sua-loai-by-maloai/${selectedWatch.id}`,
                {
                    //watchId: selectedWatch.id,
                    TenLoai: editedName,
                    MoTa: editedMoTa,
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
                    TenLoai: editedName,
                    MoTa: editedMoTa,
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
            const response = await API.delete(`/loai/xoa-loai-by-maloai/${selectedWatch.id}`, {
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
                                <h1 className="title-72">Quà tặng</h1>
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
                                                placeholder="Mô Tả"
                                                value={addMoTa}
                                                onChange={(e) => setaddMoTa(e.target.value)}
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
                                                <h2>Thông Tin Quà tặng</h2>
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

                                                            <input
                                                                type="text"
                                                                value={editedMoTa}
                                                                onChange={(e) => setEditedMoTa(e.target.value)}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="text">Tên: {selectedWatch.Ten}</p>
                                                            <p className="text">Mã hãng: {selectedWatch.MaHang}</p>
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
                                        THÊM QUÀ TẶNG
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

export default QuaTang;
