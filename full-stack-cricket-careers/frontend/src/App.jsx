import { useState } from "react"
import PlayerForm from "./PlayerForm"
import PlayerDataPage from "./PlayerDataPage";


function App() {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/cricket/getPlayer?name=${encodeURIComponent(playerName.trim())}`, {
      });
      const data = await response.json();
      setPlayerData(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleEdit = () => {
    setIsEdit(true);
  };
  return (
    <div className="flex flex-col gap-4 mb-10">
      <PlayerForm isEdit={isEdit} setIsEdit={setIsEdit} playerData={playerData} />
      <div className="flex justify-end mr-10">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button
            onClick={handleSearch}
            disabled={!playerName || playerName?.length === 0}
            className="bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition"
          >
            Search
          </button>
        </div>
      </div>
      {playerData && <PlayerDataPage playerData={playerData} handleEdit={handleEdit} />}

    </div>
  )
}

export default App
