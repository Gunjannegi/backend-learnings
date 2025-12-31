
import { FaCrown } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useEffect, useState } from "react";

const LeaderboardModal = ({ open, onClose }) => {
    const [errMessage, setErrMessage] = useState(null);
    const [leaderboardData, setLeaderboardData] = useState(null);
    const fetchLeaderboardData = async () => {
        if (open) {
            try {
                const response = await fetch(`http://localhost:3000/premium/getLeaderboard`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data?.data.length === 0) {
                        setErrMessage("No Data Found")
                    }
                    setLeaderboardData(data?.data)
                } else {
                    setErrMessage(data?.message)
                }

            } catch (err) {
                setErrMessage(data?.message)
            }
        }

    }
    useEffect(() => {
        fetchLeaderboardData();
    }, [open])
    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent
                    className="
          sm:max-w-lg
          bg-linear-to-br from-yellow-400 via-yellow-300 to-yellow-600
          text-amber-900
          border-none
        "
                >
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FaCrown />
                            Premium Leaderboard
                        </DialogTitle>
                    </DialogHeader>

                    {/* Leaderboard body */}
                    {!errMessage ? <div className="mt-4 space-y-3">
                        {leaderboardData?.map((data) => (
                            <div className="flex justify-between font-semibold">
                                <span>{data?.username}</span>
                                <span>{data?.totalExpense}</span>
                            </div>
                        ))}
                    </div> : <div className="mt-4 space-y-3">{errMessage}</div>}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default LeaderboardModal;
