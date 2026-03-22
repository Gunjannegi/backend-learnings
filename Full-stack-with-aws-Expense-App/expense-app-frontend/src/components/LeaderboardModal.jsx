import { FaTrophy } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useEffect, useState } from "react";

const LeaderboardModal = ({ open, onClose }) => {
    const [errMessage, setErrMessage] = useState(null);
    const [leaderboardData, setLeaderboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchLeaderboardData = async () => {
        if (open) {
            setLoading(true);
            setErrMessage(null);
            try {
                const response = await fetch(`http://localhost:3000/premium/getLeaderboard`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': localStorage.getItem('token')
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data?.data.length === 0) {
                        setErrMessage("No leaderboard data available yet");
                    } else {
                        setLeaderboardData(data?.data);
                    }
                } else {
                    const errorData = await response.json();
                    setErrMessage(errorData?.message || "Failed to load leaderboard");
                }
            } catch (err) {
                setErrMessage("Something went wrong. Please try again.");
                console.error('Leaderboard fetch error:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchLeaderboardData();
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg bg-white text-gray-800 border border-gray-200">
                <DialogHeader className="border-b border-gray-200 pb-3">
                    <DialogTitle className="flex items-center gap-2 text-blue-950">
                        <FaTrophy className="text-blue-950" />
                        Leaderboard
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4">
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-950"></div>
                            <span className="ml-2 text-gray-600">Loading leaderboard...</span>
                        </div>
                    ) : errMessage ? (
                        <div className="text-center py-8">
                            <div className="text-gray-400 text-4xl mb-3">📊</div>
                            <p className="text-gray-600 mb-4">{errMessage}</p>
                            <button
                                onClick={fetchLeaderboardData}
                                className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-800 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {leaderboardData?.map((data, index) => (
                                <div 
                                    key={data.id || index}
                                    className={`
                                        flex items-center justify-between p-3 rounded-lg border
                                        ${index < 3 
                                            ? 'bg-blue-50 border-blue-200' 
                                            : 'bg-gray-50 border-gray-200'
                                        }
                                        hover:shadow-sm transition-shadow
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-gray-800">
                                            {data?.username}
                                        </span>
                                    </div>
                                    <span className="font-semibold text-blue-950">
                                        ₹{parseFloat(data?.totalExpense || 0).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LeaderboardModal;