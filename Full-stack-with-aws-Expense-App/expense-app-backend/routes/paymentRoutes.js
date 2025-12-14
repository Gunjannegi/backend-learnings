// const express = require('express');
// const router = express.Router();

// router.get('/',getPaymnetPage);
// router.post('/pay',processPayment);
// router.get('/payment-status/:paymentSessionId', getPaymentStatus);

// module.exports=router;

const express = require('express');
const { createOrderController, verifyOrderController } = require("../controllers/paymentController.js");
const authenticate = require("../middleware/auth.js");

const router = express.Router();

router.post("/create-order", authenticate, createOrderController);
router.post("/verify", authenticate, verifyOrderController);

module.exports = router;