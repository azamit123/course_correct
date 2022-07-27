const express = require("express");
const router = express.Router();
const cors = require("cors");
const classController = require("../controller/class");
const authorize = require("../middleware/authorize");



router.use(authorize.authorize)
router.get("/", classController.getMyClass);
router.put("/", classController.updateClass);

router.use(authorize.protectStudent)


router.post("/sendemail", classController.sendEmail)
router.post("/payment", cors(), classController.recievePayment);
router.post("/", classController.addNewClass);
router.delete("/:class_id", classController.deleteClass);


module.exports = router;
