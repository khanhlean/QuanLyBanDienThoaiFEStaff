import './EditWatch.scss';
import React, { useState, useEffect } from 'react';
import urlImg from '@/services/urlImg';
import API from '@/services/api';
import Sidebar from '@/components/DefaultLayout/Sidebar/Sidebar';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';

const EditWatch = () => {
    const [watches, setWatches] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedWatch, setSelectedWatch] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [addWatchName, setAddWatchName] = useState('');
    const [addWatchPrice, setAddWatchPrice] = useState('');
    const [addWatchDescription, setAddWatchDescription] = useState('');
    const [addWatchLineId, setAddWatchLineId] = useState('');
    const [addWatchQuantity, setAddWatchQuantity] = useState('');
    const [addWatchType, setAddWatchType] = useState('');

    const [editedName, setEditedName] = useState(null);
    const [editedPrice, setEditedPrice] = useState(null);
    const [editedDescription, setEditedDescription] = useState(null);
    const [editedLine, setEditedLine] = useState(null);
    const [editedLineId, setEditedLineId] = useState(null);
    const [editedQuantity, setEditedQuantity] = useState(null);
    const [editedType, setEditedType] = useState(null);

    const [lines, setLines] = useState([]);

    useEffect(() => {
        if (selectedWatch) {
            setEditedName(selectedWatch.name);
            setEditedPrice(selectedWatch.price);
            setEditedDescription(selectedWatch.description);
            setEditedLine(selectedWatch.line);
            setEditedLineId(getLineId(selectedWatch.line));
            setEditedQuantity(selectedWatch.quantity);
            setEditedType(selectedWatch.type);
        }

        fetchData();
        fetchLines();
    }, [selectedWatch]);

    async function fetchData() {
        try {
            const response = await API.get('/watch/get-all-watches');
            setWatches(response.data);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    }

    async function fetchLines() {
        try {
            const response = await API.get('watch/get-all-lines');
            setLines(response.data);
        } catch (error) {
            console.error(error);
            // Xử lý lỗi
        }
    }

    const handleAddWatch = async () => {
        try {
            const token = localStorage.getItem('token');
            const fileInput = document.getElementById('fileInput');

            if (fileInput && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const formData = new FormData();

                formData.append('name', addWatchName);
                formData.append('price', addWatchPrice);
                formData.append('description', addWatchDescription);
                formData.append('image', file);
                formData.append('lineId', addWatchLineId);
                formData.append('quantity', addWatchQuantity);
                formData.append('type', addWatchType);

                const response = await API.post('/watch/add-watch', formData, {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    // Watch added successfully
                    console.log('Watch added successfully');
                    fetchData();
                    setShowAddForm(false);
                    // Update watch list or navigate to another page
                } else {
                    console.log('Failed to add watch');
                    // Handle unsuccessful watch addition
                }
            } else {
                console.log('No file selected');
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'description', headerName: 'Description', width: 300 },
        { field: 'line', headerName: 'Line', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 120 },
        { field: 'type', headerName: 'Type', width: 120 },
    ];

    const rows = watches.map((watch) => ({
        id: watch._id,
        name: watch.name,
        price: watch.price,
        description: watch.description,
        image: urlImg + watch.image,
        line: watch.line.name,
        quantity: watch.quantity,
        type: watch.type,
    }));

    const handleRowClick = (params) => {
        // Lấy thông tin đồng hồ từ hàng được bấm
        const selectedRow = params.row;
        setSelectedWatch(selectedRow);
    };

    const getLineId = (lineName) => {
        const line = lines.find((line) => line.name === lineName);
        return line ? line._id : '';
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
                `/watch/update-watch-by-id/${selectedWatch.id}`,
                {
                    watchId: selectedWatch.id,
                    name: editedName,
                    price: editedPrice,
                    description: editedDescription,
                    lineId: editedLineId,
                    quantity: editedQuantity,
                    type: editedType,
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
                    name: editedName,
                    price: editedPrice,
                    description: editedDescription,
                    line: editedLine,
                    quantity: editedQuantity,
                    type: editedType,
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
        try {
            const token = localStorage.getItem('token');
            const response = await API.delete(`/watch/delete-watch-by-id/${selectedWatch.id}`, {
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
                                <h1 className="title-72">All watches </h1>
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
                                            <h4>Add Watch</h4>
                                            <input
                                                type="text"
                                                placeholder="Watch name"
                                                value={addWatchName}
                                                onChange={(e) => setAddWatchName(e.target.value)}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Watch price"
                                                value={addWatchPrice}
                                                onChange={(e) => setAddWatchPrice(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Watch description"
                                                value={addWatchDescription}
                                                onChange={(e) => setAddWatchDescription(e.target.value)}
                                            />

                                            <input type="file" id="fileInput" />

                                            <select
                                                id="lineComboBox"
                                                value={addWatchLineId}
                                                onChange={(e) => setAddWatchLineId(e.target.value)}
                                            >
                                                {lines.map((line) => (
                                                    <option key={line._id} value={line._id}>
                                                        Line: {line.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="number"
                                                placeholder="Watch quantity"
                                                value={addWatchQuantity}
                                                onChange={(e) => setAddWatchQuantity(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Watch type"
                                                value={addWatchType}
                                                onChange={(e) => setAddWatchType(e.target.value)}
                                            />

                                            <button className="add-button" onClick={handleAddWatch}>
                                                <span>Add</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

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
                                                <h2>Watch Details</h2>
                                                <div class="image-container">
                                                    <img
                                                        src={selectedWatch.image}
                                                        alt={selectedWatch.name}
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
                                                                type="number"
                                                                value={editedPrice}
                                                                onChange={(e) => setEditedPrice(e.target.value)}
                                                            />
                                                            <input
                                                                type="text"
                                                                value={editedDescription}
                                                                onChange={(e) => setEditedDescription(e.target.value)}
                                                            />

                                                            <select
                                                                id="lineComboBox"
                                                                value={editedLineId}
                                                                onChange={(e) => setEditedLineId(e.target.value)}
                                                            >
                                                                {lines.map((line) => (
                                                                    <option key={line._id} value={line._id}>
                                                                        {line.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <input
                                                                type="number"
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
                                                            <p className="text">Name: {selectedWatch.name}</p>
                                                            <p className="text">Price: {selectedWatch.price}</p>
                                                            <p className="text">
                                                                Description: {selectedWatch.description}
                                                            </p>

                                                            <p className="text">Line: {selectedWatch.line}</p>
                                                            <p className="text">Quantity: {selectedWatch.quantity}</p>
                                                            <p className="text">Type: {selectedWatch.type}</p>
                                                        </>
                                                    )}
                                                    <div className="btn-container">
                                                        {isEditing ? (
                                                            <button
                                                                type="button"
                                                                className="edit-button"
                                                                onClick={handleSaveClick}
                                                            >
                                                                <span>Save</span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                className="edit-button"
                                                                onClick={handleEditClick}
                                                            >
                                                                <span>Edit</span>
                                                            </button>
                                                        )}
                                                        <button
                                                            type="button"
                                                            className="delete-button"
                                                            onClick={handleDeleteWatch}
                                                        >
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="pl_section__header">
                                    <button className="add-watch-button" onClick={() => setShowAddForm(true)}>
                                        Add Watch
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

export default EditWatch;
