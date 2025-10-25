import { useEffect } from "react";
import { useState } from "react";

export default function PlayerForm({ isEdit, setIsEdit, playerData }) {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        photoUrl: "",
        birthplace: "",
        career: "",
        numberOfMatches: "",
        score: "",
        filters: "",
        average: "",
        wickets: ""
    });


    useEffect(() => {
        if (isEdit && playerData) {
            setFormData({
                name: playerData.name || "",
                dob: playerData.dob
                    ? new Date(playerData.dob).toISOString().split("T")[0]
                    : "",
                photoUrl: playerData.photoUrl || "",
                birthplace: playerData.birthplace || "",
                career: playerData.career || "",
                numberOfMatches: parseInt(playerData.numberOfMatches),
                score: parseInt(playerData.score) ,
                filters: parseInt(playerData.filters),
                average: parseInt(playerData.average),
                wickets: parseInt(playerData.wickets)
            });
        }
    }, [isEdit, playerData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = `http://localhost:3000/cricket/addPlayer`
        let method = "POST"
        if (isEdit) {
            url = `http://localhost:3000/cricket/updatePlayer/${playerData.id}`;
            method = "PUT"
        }
        try {
            const response = await fetch(`${url}`, {
                method: method,
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                setFormData({
                    name: "",
                    dob: "",
                    photoUrl: "",
                    birthplace: "",
                    career: "",
                    numberOfMatches: "",
                    score: "",
                    filters: "",
                    average: "",
                    wickets: ""
                });
                isEdit && setIsEdit(false)
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="w-full max-w-md bg-gray-300 text-gray-800 py-3 px-4 rounded-t-md">
                <h2 className="text-lg font-semibold">Player Form</h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white shadow-md rounded-b-md px-6 py-8 space-y-4"
            >
                {[
                    { label: "Name", name: "name", type: "text" },
                    { label: "Date of Birth", name: "dob", type: "date" },
                    { label: "Photo URL", name: "photoUrl", type: "url" },
                    { label: "Birthplace", name: "birthplace", type: "text" },
                    { label: "Career", name: "career", type: "textarea" },
                    { label: "Number of Matches", name: "numberOfMatches", type: "number" },
                    { label: "Score", name: "score", type: "number" },
                    { label: "Filters", name: "filters", type: "text" },
                    { label: "Average", name: "average", type: "number" },
                    { label: "Wickets", name: "wickets", type: "number" },
                ].map((field) => (
                    <div key={field.name} className="flex flex-col">
                        <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                        </label>
                        {field.type === "textarea" ? (
                            <textarea
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 h-24 resize-none"
                            />
                        ) : (
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        )}

                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
