import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import Toast from "./Basic/Toast";

const ForgotPassword = ({ open, onClose }) => {
  const [useremail, setUserEmail] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!useremail) {
      setToast({ message: "Email is required", type: "error" });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/password/forgotpassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ useremail }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setToast({ message: data?.message, type: "success" });
        setUserEmail("");
        onClose();
      } else {
        setToast({
          message: data?.message || "Something went wrong",
          type: "error",
        });
      }
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg bg-white text-gray-800">
          <DialogHeader className="border-b pb-3">
            <DialogTitle>Forgot Password</DialogTitle>
          </DialogHeader>

          <div className="flex flex-row items-center mb-2 gap-4">
            <label className="font-medium">Email</label>
            <input
              type="email"
              value={useremail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="appearance-none border border-gray-300 rounded-md p-1 w-full"
              required
            />
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 border-2 border-blue-900 text-blue-950 font-medium rounded-md hover:border-blue-950 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium cursor-pointer"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default ForgotPassword;
