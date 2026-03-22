import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Toast from "./Toast";

const DeleteConfirmationPopup = ({ open, onClose, onDelete, title, message }) => {
    

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-lg bg-white text-gray-800">
                    <DialogHeader className="border-b pb-3">
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>

                    <div className="font-medium">
                        {message}
                    </div>

                    <div className="mt-2 flex justify-end gap-4">
                        <button
                            onClick={() => { onDelete() }}
                            className="px-4 py-1 border-2 border-blue-900 text-blue-950 font-medium rounded-md hover:border-blue-950 transition cursor-pointer disabled:opacity-50"
                        >
                            {"Delete"}
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

          
        </>
    );
};

export default DeleteConfirmationPopup;
