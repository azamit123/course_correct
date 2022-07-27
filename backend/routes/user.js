const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const multer = require('multer')
const authorize = require("../middleware/authorize");

// MULTER MIDDLEWARE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "pictures")
    },
    filename: (req, file, cb) => {
        cb(null, `users_${file.originalname}`)
    }
});

const uploadPics = multer({ storage: storage })

router.post("/images", uploadPics.single('pics'), userController.uploadPictures)
router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);


router.put("/", authorize.authorize, userController.updateUser);
router.delete("/:_id", authorize.authorize, userController.deleteUser);


module.exports = router;