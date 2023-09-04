const {
  testFunction,
  userLogin,
  userRegister,
  userLogout,
  downloadAllForms,
  getpform,
  getdform,
} = require("../controller/UserController");
const { auth } = require("../middlewares/authorisation");
const router = require("express").Router();
router.route("/test").get(testFunction);
router.route("/get_pform").get(auth, getpform);
router.route("/get_dform").get(auth, getdform);

router.route("/download_data").get(auth, downloadAllForms);
router.route("/user/login").post(userLogin);
router.route("/dashbord").get(auth, (req, res) => {
  res.render("dashbord");
});
router.route("/user/logout").get(userLogout);

router.route("/user/register").post(userRegister);
module.exports = router;
