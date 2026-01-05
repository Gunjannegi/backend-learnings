const Sib = require('sib-api-v3-sdk');
const dotenv = require('dotenv');
dotenv.config();

const forgotPassword = async (req, res) => {
    try {
        const { useremail } = req.body;

        if (!useremail) {
            return res.status(400).json({ message: "Email is required" });
        }

        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.BREVO_API_KEY;

        const tranEmailApi = new Sib.TransactionalEmailsApi();

        await tranEmailApi.sendTransacEmail({
            sender: {
                email: "gunjan.negi.5249@gmail.com",
                name: "Gunjan Negi"
            },
            to: [{ email: useremail }],
            subject: "Password Reset Request",
            textContent: `We received a request to reset your password for ${useremail}`
        });

        return res.status(200).json({ message: "Email sent successfully" });

    } catch (error) {
        console.error("Brevo error:", error?.response?.body || error);
        return res.status(500).json({ message: "Failed to send email" });
    }
};

module.exports = { forgotPassword };
