const router = require("express").Router();
const {
  submitForm,
  submitFormDATNUM,
} = require("../controller/FormController");
const Form = require("../models/form");
router.route("/submit").post(submitForm);
router.route("/dat/submit").post(submitFormDATNUM);
module.exports = router;
