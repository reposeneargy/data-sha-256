const mongoose = require("mongoose");
const formSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  nameOfcompany: { type: String },
  phone: {
    type: String,
    minlength: [10, "phone number must contain 10 digit."],
  },
  email: { type: String },
  city: { type: String },
  state: { type: String },
  monthly_uses: { type: String },
  submitted_date: { type: Date, default: Date.now() },
});
const Form01 = new mongoose.model("Form01", formSchema);
module.exports = Form01;
