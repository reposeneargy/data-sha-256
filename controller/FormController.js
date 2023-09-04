const Form01 = require("../models/Form01");
const Form = require("../models/form");
exports.submitForm = async (req, res) => {
  try {
    const newForm = { ...req.body };
    console.log(req.body);
    const data = await Form.create(newForm);
    res.status(200).json({
      success: true,
      message: "Form submitted successfully.",
    });
  } catch (error) {
    res.status(502).json({
      success: false,
      message: error.message,
    });
  }
};
exports.submitFormDATNUM = async (req, res) => {
  try {
    const form = await Form01.create({ ...req.body });
    res.status(200).json({
      success: true,
      message: "Form submitted successfully.",
    });
  } catch (error) {
    res.status(502).json({
      success: false,
      message: error.message,
    });
  }
};
