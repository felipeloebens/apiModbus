const router = require("express").Router();
const controller = require("../controllers/modbusController");

router.get('/api/holdingReg', (req, res) => controller.listHoldingReg(req, res));

//router.post('/api/write', (req, res) => controller.writePlc(req, res));

controller.connect();

module.exports = router;