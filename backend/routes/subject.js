const express = require("express");
const router = express.Router();
const subjectController = require("../controller/subject");
const authorize = require("../middleware/authorize");

const multer = require('multer')

// MULTER MIDDLEWARE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "pictures")
    },
    filename: (req, file, cb) => {
        cb(null, `Subjects_${file.originalname}`)
    }
});



const uploadPics = multer({ storage: storage })




router.get("/", authorize.authorize, authorize.protectStudent, subjectController.getAllsubjects);


router.use(authorize.authorize)
router.put("/", subjectController.updateSubject);


router.use(authorize.protectTutor)
router.post("/images", uploadPics.single('pics'), subjectController.uploadPictures)
router.post("/", subjectController.addNewSubject);
router.get("/:user_id", subjectController.getMySubjects);
router.delete("/:subject_id", subjectController.deleteSubject);


module.exports = router;
