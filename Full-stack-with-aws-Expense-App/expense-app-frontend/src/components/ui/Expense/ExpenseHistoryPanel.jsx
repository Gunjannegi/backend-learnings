// ExportHistoryPanel.jsx
import { useState, useEffect } from 'react';
import { FaDownload, FaTrash, FaTimes, FaFileAlt } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import { formatDate } from '@/components/Basic/dateUtils';
import DeleteConfirmationPopup from '@/components/Basic/DeleteConfirmationPopup';
import Toast from '@/components/Basic/Toast';

const ExportHistoryPanel = ({ isOpen, onClose }) => {
    const [exportHistory, setExportHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [isDeletePopup, setIsDeletePopup] = useState(false);
    const [toast, setToast] = useState(null);
    // Fetch export history when panel opens
    useEffect(() => {
        if (isOpen) {
            fetchExportHistory();
        }
    }, [isOpen]);

    const fetchExportHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3000/exports/history', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch export history');
            }

            const data = await response.json();
            setExportHistory(data.data || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching export history:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmDelete = () => {
        if (deleteId) handleDelete?.(deleteId);
        setIsDeletePopup(false);
        setDeleteId(null);
    };

    const handleCancelDelete = () => {
        setIsDeletePopup(false);
        setDeleteId(null);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setIsDeletePopup(true);
    };


    const handleDelete = async (exportId) => {
        try {
            const response = await fetch(`http://localhost:3000/exports/${exportId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });

            if (response.ok) {
                // Parse the response to get the actual message
                const data = await response.json();

                setExportHistory(prev => prev.filter(item => item.id !== exportId));
                setToast({
                    message: data.message || "File deleted successfully!",
                    type: "success"
                });
            }
        } catch (err) {
            console.error('Delete failed:', err);
            setToast({ message: "Something went wrong", type: "error" })
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* Side Panel - FIXED: Added flex flex-col */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
                {/* Header - FIXED: Added flex-shrink-0 */}
                <div className="flex items-center justify-between p-4 border-b bg-blue-950 text-white flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <BsClockHistory className="text-lg" />
                        <h2 className="text-lg font-semibold">Export History</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-blue-800 rounded"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Content - FIXED: Added flex-1 and min-h-0 */}
                <div className="flex-1 overflow-y-auto p-4 min-h-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-950"></div>
                            <span className="ml-2 text-gray-600">Loading...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <div className="text-red-500 mb-2">⚠️</div>
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={fetchExportHistory}
                                className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-800"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : exportHistory.length === 0 ? (
                        // Empty State
                        <div className="text-center py-12">
                            <FaFileAlt className="mx-auto text-4xl text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 mb-2">
                                No Export History
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Your exported files will appear here once you start downloading expense reports.
                            </p>
                        </div>
                    ) : (
                        // Export History List
                        <div className="space-y-3">
                            {exportHistory.map((exportItem) => (
                                <div
                                    key={exportItem.id}
                                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    {/* File Info */}
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span>📄</span>
                                                <a
                                                    href={exportItem.url}
                                                    download={`expenses-${formatDate(exportItem.createdAt)}.csv`}
                                                    className="font-medium text-blue-600 hover:text-blue-800 text-sm underline cursor-pointer"
                                                    title="Click to download"
                                                >
                                                    expenses-{formatDate(exportItem.createdAt)}.txt
                                                </a>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatDate(exportItem.createdAt)}
                                            </p>
                                            {exportItem.fileSize && (
                                                <p className="text-xs text-gray-400">
                                                    {formatFileSize(exportItem.fileSize)}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Period/Filter Info */}
                                    {exportItem.period && (
                                        <div className="text-xs text-gray-600 mb-3 bg-gray-50 px-2 py-1 rounded">
                                            Period: {exportItem.period}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex justify-end gap-2">
                                        <button
                                            // onClick={() => handleDelete(exportItem.id)}
                                            onClick={() => handleDeleteClick(exportItem.id)}
                                            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                                            title="Delete"
                                        >
                                            <FaTrash className="text-xs" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {toast && (
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            onClose={() => setToast(null)}
                        />
                    )}
                </div>
            </div>
            <DeleteConfirmationPopup
                open={isDeletePopup}
                onClose={handleCancelDelete}
                onDelete={handleConfirmDelete}
                title={"Delete Expense File"}
                message={"Are you sure you want to delete this expense file?"}
            />

        </>
    );
};

export default ExportHistoryPanel;