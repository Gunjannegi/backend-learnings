const PlayerDataPage = ({ playerData, handleEdit }) => {
    if (!playerData) {
        return <div className="text-center text-gray-500 py-10">No player data available</div>;
    }

    return (
        <div className="mx-10 mb-10 bg-white shadow-md border-2 border-gray-200 rounded-md p-6 ">
            <div className="flex justify-end mb-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition"
                onClick={()=>{handleEdit()}}>
                    Edit Player
                </button>
            </div>
            <div className="flex">
                <div>
                    <div className="flex flex-col mb-4">
                        <img
                            src={playerData.photoUrl}
                            alt={playerData.name}
                            className="w-20 h-20 object-cover rounded-full border border-gray-300 shadow-sm"
                        />
                        <div className="flex flex-col space-y-1 text-center sm:text-left">
                            <h1 className="text-lg font-bold text-gray-800">{playerData.name}</h1>
                            <p className="text-gray-600 text-md">{playerData.dob
                                ? new Date(playerData.dob).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })
                                : ""}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h2>

                        <div className="grid grid-cols-1 gap-y-4 text-gray-700">
                            <p><span className="font-medium">Matches:</span> {playerData.numberOfMatches}</p>
                            <p><span className="font-medium">Score:</span> {playerData.score}</p>
                            <p><span className="font-medium">Average:</span> {playerData.average}</p>
                            <p><span className="font-medium">Wickets:</span> {playerData.wickets}</p>
                            <p><span className="font-medium">Filters:</span> {playerData.filters}</p>
                        </div>
                    </div>
                </div>
                <div className="w-4/5 flex items-center ml-14">{playerData.career}</div>
            </div>

        </div>
    );
};

export default PlayerDataPage;
