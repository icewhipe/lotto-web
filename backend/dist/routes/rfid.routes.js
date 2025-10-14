"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rfid_controller_1 = require("../controllers/rfid.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// @route   POST /api/rfid/cards
router.post('/cards', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), rfid_controller_1.createRFIDCard);
// @route   GET /api/rfid/cards
router.get('/cards', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), rfid_controller_1.getRFIDCards);
// @route   GET /api/rfid/cards/:id
router.get('/cards/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), rfid_controller_1.getRFIDCardById);
// @route   PUT /api/rfid/cards/:id
router.put('/cards/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), rfid_controller_1.updateRFIDCard);
// @route   DELETE /api/rfid/cards/:id
router.delete('/cards/:id', authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)('ADMIN'), rfid_controller_1.deleteRFIDCard);
// @route   POST /api/rfid/scan
router.post('/scan', rfid_controller_1.processScan); // System access (no auth for turnstile)
exports.default = router;
//# sourceMappingURL=rfid.routes.js.map