import React from "react";

const UsersList = ({ userData, onEdit, onDelete }) => {
    // userData is expected to be an array of user objects

    if (!Array.isArray(userData) || userData.length === 0) {
        return <div className="mt-4">No users found.</div>;
    };

    return (
        <table className="min-w-fit">
            <thead>
                <tr>
                    <th className="text-left px-2">Username</th>
                    <th className="text-left px-2">Phone Number</th>
                    <th className="text-left px-2">Email</th>
                    <th className="px-2"></th>
                    <th className="px-2"></th>
                </tr>
            </thead>
            <tbody>
                {userData.map((uData, idx) => (
                    <tr key={uData.uId ?? uData.uId ?? idx} className="border-2">
                        <td className="px-2">{uData.username}</td>
                        <td className="px-2">{uData.phoneNumber}</td>
                        <td className="px-2">{uData.email}</td>
                        <td className="px-2">
                            <button
                                type="button"
                                className="text-blue-600 hover:underline cursor-pointer"
                                onClick={() => onEdit(uData)}
                            >
                                Edit
                            </button>
                        </td>
                        <td className="px-2">
                            <button
                                type="button"
                                className="text-red-600 hover:underline cursor-pointer"
                                onClick={() => onDelete(uData.userId)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersList;